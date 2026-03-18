# N2O Delivery Service - Full Stack Project

Полнофункциональная система для Telegram Bot + Mini App доставки закиси азота.

## 📁 Структура проекта

```
azot/
├── backend/          # NestJS Backend API
├── admin/            # React Admin Panel
└── src/              # Frontend Mini App (существующий)
```

## 🚀 Быстрый старт

### Backend

```bash
cd backend
npm install
# Настройте .env файл (см. backend/.env.example)
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run start:dev
```

Backend запустится на `http://localhost:3000`

### Admin Panel

```bash
cd admin
npm install
# Настройте .env файл (VITE_API_URL=http://localhost:3000)
npm run dev
```

Admin panel запустится на `http://localhost:5174`

### Frontend (Mini App)

```bash
npm install
npm run dev
```

Frontend запустится на `http://localhost:5173`

## 🔐 Дефолтный админ

- **Email:** dsc-23@yandex.ru
- **Password:** 123123123

## 📡 API Endpoints

### Public (Mini App)
- `GET /api/products` - Получить активные товары
- `GET /api/user?telegramId=xxx` - Получить пользователя
- `POST /api/order` - Создать заказ

### Admin (Protected)
- `POST /auth/login` - Вход
- `GET /admin/dashboard` - Статистика
- `GET /users` - Список пользователей
- `GET /products` - Список товаров
- `POST /products` - Создать товар
- `PATCH /products/:id` - Обновить товар
- `DELETE /products/:id` - Удалить товар
- `GET /orders` - Список заказов
- `PATCH /orders/:id` - Обновить статус заказа
- `POST /broadcast` - Создать рассылку
- `POST /broadcast/:id/send` - Отправить рассылку

## 🤖 Telegram Bot

Бот автоматически:
- Сохраняет пользователей при `/start`
- Показывает каталог при `/catalog`
- Отправляет уведомления менеджеру о новых заказах

## 🗄️ База данных

PostgreSQL с Prisma ORM.

Модели:
- **User** - Пользователи Telegram
- **AdminUser** - Администраторы
- **Product** - Товары
- **Order** - Заказы
- **Broadcast** - Рассылки

## 📦 Технологии

### Backend
- NestJS
- PostgreSQL
- Prisma ORM
- Telegraf (Telegram Bot)
- JWT Authentication
- bcrypt (password hashing)

### Admin Panel
- React + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios

### Frontend (Mini App)
- React + TypeScript
- Vite
- TailwindCSS
- Framer Motion

## 🔧 Настройка окружения

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/n2o_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_MANAGER_CHAT_ID="your-chat-id"
PORT=3000
```

### Admin Panel (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 📝 Особенности

✅ Полная система аутентификации  
✅ Управление заказами  
✅ Управление товарами  
✅ Управление пользователями  
✅ Система рассылки с rate limiting  
✅ Telegram Bot интеграция  
✅ Dashboard со статистикой  
✅ Clean Architecture  
✅ Production-ready структура  

## 🎨 Дизайн

Все интерфейсы используют единый стиль:
- Темная тема
- Золотые акценты
- Glass-card эффекты
- Плавные анимации
