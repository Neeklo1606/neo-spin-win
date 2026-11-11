import { IsString, IsInt, IsOptional, IsBoolean, ValidateIf, IsIn } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Legacy fields (optional)
  @IsInt()
  @IsOptional()
  price5l?: number | null;

  @IsInt()
  @IsOptional()
  price10l?: number | null;

  @ValidateIf((o) => o.exchangePrice5l !== null && o.exchangePrice5l !== undefined)
  @IsInt()
  @IsOptional()
  exchangePrice5l?: number | null;

  @ValidateIf((o) => o.exchangePrice10l !== null && o.exchangePrice10l !== undefined)
  @IsInt()
  @IsOptional()
  exchangePrice10l?: number | null;

  // New universal fields
  @IsInt()
  @IsOptional()
  price?: number | null;

  @IsString()
  @IsIn(['fixed', 'request'])
  @IsOptional()
  priceType?: string;

  @IsString()
  @IsOptional()
  category?: string | null;

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
