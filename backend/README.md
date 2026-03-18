# N2O Delivery Service Backend

Backend API for Telegram Bot + Mini App delivery service.

## Tech Stack

- NestJS
- PostgreSQL
- Prisma ORM
- Telegraf (Telegram Bot)
- JWT Authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (see `.env.example`):
```env
DATABASE_URL="postgresql://user:password@localhost:5432/n2o_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_MANAGER_CHAT_ID="your-manager-chat-id"
PORT=3000
NODE_ENV=development
```

3. Setup database:
```bash
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
```

4. Start server:
```bash
npm run start:dev
```

## Default Admin

- Email: dsc-23@yandex.ru
- Password: 123123123

## API Endpoints

### Public (Mini App)
- `GET /api/products` - Get active products
- `GET /api/user?telegramId=xxx` - Get user by telegram ID
- `POST /api/order` - Create order

### Admin (Protected)
- `POST /auth/login` - Login
- `GET /admin/dashboard` - Dashboard stats
- `GET /users` - List users
- `GET /products` - List products
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /orders` - List orders
- `PATCH /orders/:id` - Update order status
- `POST /broadcast` - Create broadcast
- `POST /broadcast/:id/send` - Send broadcast

## Telegram Bot

Bot automatically:
- Saves users on /start
- Shows catalog on /catalog
- Sends order notifications to manager
