import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateBotSettingDto {
  @IsString()
  @IsOptional()
  botName?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  fullDescription?: string;

  @IsString()
  @IsOptional()
  welcomeMessage?: string;

  @IsString()
  @IsOptional()
  managerChatId?: string;

  @IsString()
  @IsOptional()
  telegramUsername?: string;

  @IsString()
  @IsOptional()
  telegramChannelUrl?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  orderTemplate?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsInt()
  @IsOptional()
  deliveryPriceOutside?: number;

  @IsInt()
  @IsOptional()
  deliveryPriceInside?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsInt()
  @IsOptional()
  minOrderAmount?: number;

  @IsBoolean()
  @IsOptional()
  isBotEnabled?: boolean;
}
