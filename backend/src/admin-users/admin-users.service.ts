import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.adminUser.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.adminUser.findUnique({
      where: { id },
    });
  }
}
