import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  UnauthorizedException,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramValidatorService } from '../telegram/telegram-validator.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api')
export class ApiController {
  private readonly uploadsDir = path.join(process.cwd(), 'uploads');

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private prisma: PrismaService,
    private telegramValidator: TelegramValidatorService,
  ) {}

  @Get('products')
  getProducts() {
    return this.productsService.findAll(true);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard)
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.update(+id, updateProductDto as UpdateProductDto);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('uploads/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          fs.mkdirSync(path.join(process.cwd(), 'uploads'), { recursive: true });
          cb(null, path.join(process.cwd(), 'uploads'));
        },
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname || '').toLowerCase();
          const safeExt = ext || '.jpg';
          const base = Date.now().toString(36);
          const random = Math.random().toString(36).slice(2, 8);
          cb(null, `${base}-${random}${safeExt}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const isImage = (file.mimetype || '').startsWith('image/');
        cb(isImage ? null : new BadRequestException('Only image files are allowed'), isImage);
      },
    }),
  )
  uploadImage(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return {
      filename: file.filename,
      url: `/api/uploads/${file.filename}`,
    };
  }

  @Get('uploads/:filename')
  getUploadedImage(@Param('filename') filename: string, @Res() res: Response) {
    const safeName = path.basename(filename);
    const filePath = path.join(this.uploadsDir, safeName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    return res.sendFile(filePath);
  }

  // Public settings for frontend (no auth)
  @Get('public/bot-settings')
  async getPublicBotSettings() {
    const settings = await this.prisma.botSetting.findFirst();
    if (!settings) {
      return {
        telegramChannelUrl: null,
        telegramUsername: null,
        phone: null,
      };
    }
    return {
      telegramChannelUrl: settings.telegramChannelUrl,
      telegramUsername: settings.telegramUsername,
      phone: settings.phone,
    };
  }

  @Get('user')
  async getUser(@Query('initData') initData: string) {
    if (!initData) {
      return null;
    }

    try {
      const telegramUser = this.telegramValidator.validateInitData(initData);
      return this.usersService.findByTelegramId(telegramUser.id.toString());
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }
  }

  @Get('orders')
  async getUserOrders(
    @Query('initData') initData: string,
    @Query('phone') phone: string,
  ) {
    // A bare telegramId (query or x-telegram-id header) is NOT trusted any more:
    // anyone could pass someone else's id. Mini App must send signed initData.
    let user = null;
    let verified = false;

    if (initData) {
      try {
        const telegramUser = this.telegramValidator.validateInitData(initData);
        user = await this.usersService.findByTelegramId(telegramUser.id.toString());
        verified = true;
      } catch (error: any) {
        console.error('❌ Invalid initData for /api/orders:', error.message);
      }
    }

    // Web profile: lookup by the phone the visitor ordered with. The phone is not
    // proof of identity, so personal details are stripped from the response below.
    if (!user && phone) {
      user = await this.prisma.user.findFirst({ where: { phone } });
    }

    if (!user) {
      return { data: [], total: 0 };
    }

    const orders = await this.prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const data = orders.map((order) => {
      const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
      if (verified) return { ...order, items };
      const { address, name, phone: _phone, telegramUsername, ...rest } = order as any;
      return { ...rest, items };
    });

    return { data, total: data.length };
  }

  @Post('order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('📥 POST /api/order received:', {
      hasInitData: !!createOrderDto.initData,
      initDataLength: createOrderDto.initData?.length,
      itemsCount: createOrderDto.items?.length,
      address: createOrderDto.address,
      name: (createOrderDto as any).name,
      phone: (createOrderDto as any).phone,
    });
    return this.ordersService.create(createOrderDto);
  }

  @Post('address')
  async addAddress(@Body() body: { initData: string; address: string }) {
    try {
      const telegramUser = this.telegramValidator.validateInitData(body.initData);
      // For now, return success (addresses stored in localStorage on frontend)
      // In production, you might want to store addresses in database
      return {
        id: Date.now().toString(),
        address: body.address,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string, @Body() body: { initData: string }) {
    try {
      this.telegramValidator.validateInitData(body.initData);
      // For now, return success
      return { success: true };
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }
  }
}
