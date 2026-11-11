import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBotSettingDto } from './dto/update-bot-setting.dto';

@Injectable()
export class BotSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne() {
    let settings = await this.prisma.botSetting.findFirst();
    
    // If no settings exist, create default
    if (!settings) {
      settings = await this.prisma.botSetting.create({
        data: {
          botName: 'N2O Ростов Bot',
          shortDescription: 'Купить закись азота в Ростове',
          fullDescription: 'Доставка N2O баллонов 5л и 10л',
          welcomeMessage: '🔥 Добро пожаловать!\nВыберите товар:',
          managerChatId: '',
          telegramUsername: '@azot_rostov',
          telegramChannelUrl: null,
          phone: '+7',
          orderTemplate: 'Новый заказ!\n\n📦 {product}\nТип: {type}\nКол-во: {quantity}\n\n🚚 Доставка: {delivery}\n📍 Адрес: {address}\n\n👤 {name}\n📞 {phone}\n\n💰 {total} ₽',
          city: 'Ростов-на-Дону',
          deliveryPriceOutside: 500,
          deliveryPriceInside: 0,
          currency: '₽',
          minOrderAmount: 0,
          isBotEnabled: true,
        },
      });
    }
    
    return settings;
  }

  async update(updateBotSettingDto: UpdateBotSettingDto) {
    let settings = await this.prisma.botSetting.findFirst();
    
    if (!settings) {
      // Create if doesn't exist
      settings = await this.prisma.botSetting.create({
        data: {
          botName: updateBotSettingDto.botName || 'Azot Bot',
          shortDescription: updateBotSettingDto.shortDescription || null,
          fullDescription: updateBotSettingDto.fullDescription || null,
          welcomeMessage: updateBotSettingDto.welcomeMessage || null,
          managerChatId: updateBotSettingDto.managerChatId || null,
          telegramUsername: updateBotSettingDto.telegramUsername || null,
          telegramChannelUrl: updateBotSettingDto.telegramChannelUrl || null,
          phone: updateBotSettingDto.phone || null,
          orderTemplate: updateBotSettingDto.orderTemplate || null,
        },
      });
    } else {
      // Update existing
      settings = await this.prisma.botSetting.update({
        where: { id: settings.id },
        data: updateBotSettingDto,
      });
    }
    
    return settings;
  }
}
