import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.contentBlock.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async update(updateContentDto: UpdateContentDto) {
    const results = [];

    for (const item of updateContentDto.content) {
      const existing = await this.prisma.contentBlock.findUnique({
        where: { key: item.key },
      });

      if (existing) {
        // Update existing
        const updated = await this.prisma.contentBlock.update({
          where: { key: item.key },
          data: {
            value: item.value,
            type: item.type || existing.type,
            page: item.page !== undefined ? item.page : existing.page,
            block: item.block !== undefined ? item.block : existing.block,
            label: item.label !== undefined ? item.label : existing.label,
          },
        });
        results.push(updated);
      } else {
        // Create new
        const created = await this.prisma.contentBlock.create({
          data: {
            key: item.key,
            value: item.value,
            type: item.type || 'text',
            page: item.page || null,
            block: item.block || null,
            label: item.label || null,
          },
        });
        results.push(created);
      }
    }

    return results;
  }

  async findByKey(key: string) {
    return this.prisma.contentBlock.findUnique({
      where: { key },
    });
  }
}
