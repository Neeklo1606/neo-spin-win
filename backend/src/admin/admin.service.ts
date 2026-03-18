import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalOrders, totalRevenue, recentOrders] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        _sum: {
          totalPrice: true,
          deliveryPrice: true,
        },
      }),
      this.prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
        },
      }),
    ]);

    const revenue = (totalRevenue._sum.totalPrice || 0) + (totalRevenue._sum.deliveryPrice || 0);

    return {
      totalUsers,
      totalOrders,
      revenue,
      recentOrders,
    };
  }
}
