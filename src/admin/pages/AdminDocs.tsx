import { motion } from 'framer-motion';

export default function AdminDocs() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gold-text">Документация админ‑панели</span>
        </h1>
        <p className="text-muted-foreground">
          Краткое руководство по разделам админки: что где искать и как пользоваться.
        </p>
      </div>

      {['Dashboard','Заказы','Товары','Пользователи','Рассылка','Настройки бота','Контент','FAQ'].map((_,i)=>null)}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Dashboard</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Сводка показателей и быстрые ссылки.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Заказы</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Таблица заказов (новые выше). Клик по строке — детали.</li>
          <li>Меняйте статус: new / processing / delivered.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Товары</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Добавление/редактирование товаров. Для баллонов — цены 5л/10л и цены обмена.</li>
          <li>Для аксессуаров — универсальная цена или «по запросу».</li>
          <li>Картинка: можно загрузить файл (вернётся URL) или вставить URL вручную.</li>
          <li>Переключатель «Активен» скрывает/показывает товар на сайте.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Пользователи</h2>
        <p className="text-sm text-muted-foreground">Справочник пользователей из Mini App/веба (для истории заказов).</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Рассылка</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Сообщения через бота подписчикам/каналам.</li>
          <li>Для приватных контактов используйте числовой chat_id; для каналов можно @username.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Настройки бота</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Chat ID менеджера — куда прилетают заказы (желательно числовой id).</li>
          <li>Telegram username, телефон, город, цены доставки — используются на сайте/в уведомлениях.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">Контент</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Тексты/картинки главной страницы. Изменения сразу доступны после публикации.</li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-3">FAQ</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Как загрузить фото: Товары → Редактировать → URL изображения → Загрузить фото → Сохранить.</li>
          <li>Нет уведомлений в TG: проверьте Chat ID менеджера и что бот не заблокирован.</li>
        </ul>
      </motion.div>
    </div>
  ); 
}
