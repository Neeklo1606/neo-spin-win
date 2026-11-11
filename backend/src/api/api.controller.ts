import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  UnauthorizedException,
  Headers,
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
    @Query('telegramId') telegramId: string,
    @Headers('x-telegram-id') telegramIdHeader: string,
  ) {
    // Get telegramId from header or query (header has priority)
    const finalTelegramId = telegramIdHeader || telegramId;
    
    console.log('📥 GET /api/orders called:', { 
      hasInitData: !!initData, 
      phone, 
      telegramId: finalTelegramId,
      telegramIdFromHeader: telegramIdHeader,
    });

    let user = null;

    // Priority 1: telegramId from header or query (for MiniApp)
    if (finalTelegramId) {
      console.log('🔍 Searching by telegramId:', finalTelegramId);
      user = await this.usersService.findByTelegramId(finalTelegramId);
      if (user) {
        console.log('✅ User found by telegramId:', user.id);
      } else {
        console.log('⚠️ User not found by telegramId:', finalTelegramId);
      }
    }
    // Priority 2: initData (legacy MiniApp support)
    else if (initData) {
      try {
        const telegramUser = this.telegramValidator.validateInitData(initData);
        console.log('✅ Telegram user validated for orders:', telegramUser.id);
        user = await this.usersService.findByTelegramId(telegramUser.id.toString());
        if (user) {
          console.log('✅ User found by initData:', user.id);
        } else {
          console.log('⚠️ User not found for telegramId:', telegramUser.id);
        }
      } catch (error: any) {
        console.error('❌ Error validating initData:', error.message);
        // Don't throw, try phone fallback
      }
    }
    // Priority 3: phone (for WEB)
    if (!user && phone) {
      console.log('🔍 Searching by phone:', phone);
      user = await this.prisma.user.findFirst({
        where: { phone },
      });
      if (user) {
        console.log('✅ User found by phone:', user.id);
      } else {
        console.log('⚠️ User not found by phone:', phone);
      }
    }

    if (!user) {
      console.log('⚠️ No user found, returning empty orders');
      return { data: [], total: 0 };
    }

    console.log('👤 User found:', user.id);
    
    const orders = await this.prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('📦 Found orders:', orders.length);
    
    // Parse items from JSON string to array for each order
    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
    }));
    
    return { data: ordersWithParsedItems, total: ordersWithParsedItems.length };
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
