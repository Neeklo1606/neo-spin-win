import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (token) {
      this.bot = new Telegraf(token);
    }
  }

  async onModuleInit() {
    if (this.bot) {
      this.setupBot();
      await this.bot.launch();
      console.log('🤖 Telegram bot started');
    }
  }

  private setupBot() {
    // /start command
    this.bot.start(async (ctx) => {
      const user = ctx.from;
      await this.usersService.findOrCreate(BigInt(user.id), {
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
      });

      await ctx.reply(
        '👋 Добро пожаловать! Используйте Mini App для заказа товаров.',
      );
    });

    // /catalog command
    this.bot.command('catalog', async (ctx) => {
      const products = await this.prisma.product.findMany({
        where: { isActive: true },
      });

      if (products.length === 0) {
        await ctx.reply('📦 Каталог пуст');
        return;
      }

      let message = '📦 Каталог товаров:\n\n';
      products.forEach((product) => {
        message += `• ${product.name}\n`;
        message += `  5л: ${product.price5l} ₽\n`;
        message += `  10л: ${product.price10l} ₽\n\n`;
      });

      await ctx.reply(message);
    });
  }

  async sendOrderNotification(order: any) {
    if (!this.bot) return;

    const managerChatId = this.configService.get<string>('TELEGRAM_MANAGER_CHAT_ID');
    if (!managerChatId) return;

    const items = Array.isArray(order.items) ? order.items : [];
    const itemsText = items
      .map(
        (item: any) =>
          `  • ${item.name} (${item.volume}) x${item.quantity} - ${item.price * item.quantity} ₽`,
      )
      .join('\n');

    const message = `🆕 Новый заказ #${order.id}\n\n` +
      `👤 Пользователь: ${order.user.firstName || ''} ${order.user.lastName || ''}\n` +
      `📱 Telegram: @${order.user.username || 'N/A'}\n\n` +
      `📦 Товары:\n${itemsText}\n\n` +
      `💰 Итого: ${order.totalPrice} ₽\n` +
      `🚚 Доставка: ${order.deliveryPrice} ₽\n` +
      `📍 Адрес: ${order.address || 'Не указан'}\n\n` +
      `Статус: ${order.status}`;

    try {
      await this.bot.telegram.sendMessage(managerChatId, message);
    } catch (error) {
      console.error('Failed to send order notification:', error);
    }
  }

  async sendMessage(chatId: number, message: string) {
    if (!this.bot) return false;

    try {
      await this.bot.telegram.sendMessage(chatId, message);
      return true;
    } catch (error) {
      console.error(`Failed to send message to ${chatId}:`, error);
      return false;
    }
  }
}
