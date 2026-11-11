import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { sanitizeUtf8String } from '../common/encoding.util';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private prisma: PrismaService) {}

  private normalizeTextFields<T extends { name?: string | null; description?: string | null; category?: string | null; imageUrl?: string | null }>(
    data: T,
  ): T {
    return {
      ...data,
      name: sanitizeUtf8String(data.name, 'name', this.logger),
      description: sanitizeUtf8String(data.description, 'description', this.logger),
      category: sanitizeUtf8String(data.category, 'category', this.logger),
      imageUrl: sanitizeUtf8String(data.imageUrl, 'imageUrl', this.logger),
    };
  }

  async create(createProductDto: CreateProductDto) {
    // Safe defaults for backward compatibility
    const safeData = this.normalizeTextFields({
      ...createProductDto,
      productType: createProductDto.productType || 'cylinder',
      priceType: createProductDto.priceType || 'fixed',
    });
    return this.prisma.product.create({
      data: safeData,
    });
  }

  async findAll(activeOnly: boolean = false) {
    const where = activeOnly ? { isActive: true } : {};
    const products = await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    // Ensure productType and priceType are always present (fallback for old data)
    return products.map(product => ({
      ...product,
      productType: product.productType || 'cylinder',
      priceType: product.priceType || 'fixed',
    }));
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) return null;
    // Ensure productType and priceType are always present (fallback for old data)
    return {
      ...product,
      productType: product.productType || 'cylinder',
      priceType: product.priceType || 'fixed',
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Safe defaults - don't override if not provided
    const safeData: any = this.normalizeTextFields({ ...updateProductDto });
    // Only set defaults if productType/priceType are being updated
    if (updateProductDto.productType !== undefined) {
      safeData.productType = updateProductDto.productType || 'cylinder';
    }
    if (updateProductDto.priceType !== undefined) {
      safeData.priceType = updateProductDto.priceType || 'fixed';
    }
    const updated = await this.prisma.product.update({
      where: { id },
      data: safeData,
    });
    // Ensure productType and priceType are always present
    return {
      ...updated,
      productType: updated.productType || 'cylinder',
      priceType: updated.priceType || 'fixed',
    };
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
