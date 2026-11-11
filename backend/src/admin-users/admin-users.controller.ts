import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as bcrypt from 'bcryptjs';

@UseGuards(JwtAuthGuard)
@Controller('api/admin-users')
export class AdminUsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminUsers: AdminUsersService,
  ) {}

  @Get()
  async list() {
    const users = await this.prisma.adminUser.findMany({
      orderBy: { id: 'asc' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return { data: users };
  }

  @Post()
  async create(@Body() body: { email: string; password: string; name: string; role?: string }) {
    const exists = await this.adminUsers.findByEmail(body.email);
    if (exists) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const created = await this.prisma.adminUser.create({
      data: {
        email: body.email,
        password: passwordHash,
        name: body.name || 'Admin',
        role: body.role || 'admin',
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return created;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { email?: string; password?: string; name?: string; role?: string },
  ) {
    const data: any = {};
    if (body.email) data.email = body.email;
    if (body.name) data.name = body.name;
    if (body.role) data.role = body.role;
    if (body.password) data.password = await bcrypt.hash(body.password, 10);

    const updated = await this.prisma.adminUser.update({
      where: { id: Number(id) },
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.prisma.adminUser.delete({ where: { id: Number(id) } });
    return { success: true };
  }
}
