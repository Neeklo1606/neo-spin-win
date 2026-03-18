import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(telegramId: bigint, data: {
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      });
    } else {
      // Update user data if provided
      user = await this.prisma.user.update({
        where: { telegramId },
        data: {
          username: data.username ?? user.username,
          firstName: data.firstName ?? user.firstName,
          lastName: data.lastName ?? user.lastName,
          phone: data.phone ?? user.phone,
        },
      });
    }

    return user;
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async findByTelegramId(telegramId: bigint) {
    return this.prisma.user.findUnique({
      where: { telegramId },
    });
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
