import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ProductsModule, OrdersModule, UsersModule, PrismaModule],
  controllers: [ApiController],
})
export class ApiModule {}
