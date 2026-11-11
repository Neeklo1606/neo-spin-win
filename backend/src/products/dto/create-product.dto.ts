import { IsString, IsInt, IsOptional, IsBoolean, IsIn, ValidateIf } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Legacy fields (optional for backward compatibility)
  @ValidateIf((o) => o.productType === 'cylinder')
  @IsInt()
  @IsOptional()
  price5l?: number;

  @ValidateIf((o) => o.productType === 'cylinder')
  @IsInt()
  @IsOptional()
  price10l?: number;

  @IsInt()
  @IsOptional()
  exchangePrice5l?: number;

  @IsInt()
  @IsOptional()
  exchangePrice10l?: number;

  // New universal fields
  @ValidateIf((o) => o.productType !== 'cylinder')
  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsIn(['fixed', 'request'])
  @IsOptional()
  priceType?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsIn(['cylinder', 'accessory', 'other'])
  @IsOptional()
  productType?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
