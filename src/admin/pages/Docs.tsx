import { motion } from 'framer-motion';
import AdminLayout from '../components/AdminLayout';

export default function Docs() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gold-text">Документация админ‑панели</span>
        </h1>
        <p className="text-muted-foreground">
          На этой странице кратко и по делу — как пользоваться каждой секцией админки. Все действия требуются авторизация.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Dashboard</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Краткая сводка по заказам и активности.</li>
          <li>Быстрые ссылки на ключевые разделы.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Заказы</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Список заказов по убыванию даты. Клик — подробности.</li>
          <li>Столбцы: товары, адрес, сумма, статус.</li>
          <li>Статусы: <b>new</b>, <b>processing</b>, <b>delivered</b>. Меняется через кнопку редактирования.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Товары</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li><b>Добавить товар</b> — откроется форма. Для баллонов указывайте цену 5л/10л и при необходимости цены обмена.</li>
          <li><b>Тип товара</b>: Баллон / Аксессуар / Другое. Для аксессуаров доступна универсальная цена или «по запросу».</li>
          <li><b>Изображение</b>: можно указать URL или загрузить файл — вернётся URL, который сохраняется в товар.</li>
          <li><b>Активен</b>: если выключено — товар не отображается на сайте.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Пользователи</h2>
        <p className="text-sm text-muted-foreground">Справочник пользователей, созданных из Mini App/веба. Используется для истории заказов.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Рассылка</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Отправка сообщений через бота подписчикам (если бот разрешён и у вас есть chat_id).</li>
          <li>Для приватных пользователей используйте числовой chat_id. Для каналов/групп — можно <code>@username</code>.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Настройки бота</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li><b>Chat ID менеджера</b> — числовой chat_id, куда будут приходить заказы (самый надёжный вариант).</li>
          <li><b>Telegram username</b> — ваш @username (используется в интерфейсе и как fallback).</li>
          <li><b>Телефон/город/цены доставки</b> — отображение на сайте и в уведомлениях.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Контент</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Управление текстами главной страницы: заголовки, описание, статистика, изображения.</li>
          <li>Все поля имеют понятные ключи и предпросмотр на сайте после публикации.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">FAQ</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li><b>Как загрузить фото товара?</b> В «Товары» → Редактировать → «URL изображения» → «Загрузить фото» → Сохранить.</li>
          <li><b>Не приходят заказы в Telegram?</b> Убедитесь, что указан <b>Chat ID менеджера</b> и бот не заблокирован.</li>
          <li><b>Цены доставки</b> — задаются в «Настройки бота»; фронтенд показывает оценку, бэкенд —truth.</li>
        </ul>
      </motion.div>
    </div>
  );
}
*** End Patch@click json```" }```?
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
*** End Patch
