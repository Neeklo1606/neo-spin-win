import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsEnum(['new', 'processing', 'delivered'])
  @IsOptional()
  status?: 'new' | 'processing' | 'delivered';
}
