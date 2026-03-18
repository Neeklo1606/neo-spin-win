import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api')
export class ApiController {
  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @Get('products')
  getProducts() {
    return this.productsService.findAll(true);
  }

  @Get('user')
  async getUser(@Query('telegramId') telegramId: string) {
    if (!telegramId) {
      return null;
    }
    return this.usersService.findByTelegramId(BigInt(telegramId));
  }

  @Get('orders')
  async getUserOrders(@Query('telegramId') telegramId: string) {
    if (!telegramId) {
      return { data: [], total: 0 };
    }
    const user = await this.usersService.findByTelegramId(BigInt(telegramId));
    if (!user) {
      return { data: [], total: 0 };
    }
    const orders = await this.prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return { data: orders, total: orders.length };
  }

  @Post('order')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('address')
  async addAddress(@Body() body: { telegramId: number; address: string }) {
    // For now, return success (addresses stored in localStorage on frontend)
    // In production, you might want to store addresses in database
    return {
      id: Date.now().toString(),
      address: body.address,
    };
  }

  @Delete('address/:id')
  async deleteAddress(@Param('id') id: string, @Body() body: { telegramId: number }) {
    // For now, return success
    return { success: true };
  }
}
