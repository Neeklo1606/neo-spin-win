import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import api from '../lib/api';

interface Broadcast {
  id: number;
  message: string;
  sent: boolean;
  createdAt: string;
  sentAt: string | null;
}

export default function Broadcast() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState<number | null>(null);

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  const fetchBroadcasts = async () => {
    try {
      const response = await api.get('/broadcast');
      setBroadcasts(response.data);
    } catch (error) {
      console.error('Failed to fetch broadcasts:', error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await api.post('/broadcast', { message });
      setMessage('');
      fetchBroadcasts();
    } catch (error) {
      console.error('Failed to create broadcast:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (id: number) => {
    if (!confirm('Отправить рассылку всем пользователям?')) return;

    setSending(id);
    try {
      const response = await api.post(`/broadcast/${id}/send`);
      alert(`Отправлено: ${response.data.successCount}, Ошибок: ${response.data.failCount}`);
      fetchBroadcasts();
    } catch (error) {
      console.error('Failed to send broadcast:', error);
      alert('Ошибка при отправке рассылки');
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gold-text">Рассылка</span>
        </h1>
        <p className="text-muted-foreground">Отправка сообщений всем пользователям</p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <form onSubmit={handleCreate} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Сообщение</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground border border-border min-h-[120px]"
              placeholder="Введите сообщение для рассылки..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="gold-gradient text-primary-foreground font-bold px-6 py-3 rounded-lg hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Создание...' : 'Создать рассылку'}
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">История рассылок</h2>
          {broadcasts.length === 0 ? (
            <p className="text-muted-foreground">Нет рассылок</p>
          ) : (
            broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="p-4 bg-secondary rounded-lg flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="mb-2">{broadcast.message}</p>
                  <p className="text-sm text-muted-foreground">
                    Создано: {new Date(broadcast.createdAt).toLocaleString('ru-RU')}
                    {broadcast.sent && broadcast.sentAt && (
                      <> | Отправлено: {new Date(broadcast.sentAt).toLocaleString('ru-RU')}</>
                    )}
                  </p>
                </div>
                {!broadcast.sent && (
                  <button
                    onClick={() => handleSend(broadcast.id)}
                    disabled={sending === broadcast.id}
                    className="ml-4 gold-gradient text-primary-foreground font-bold px-4 py-2 rounded-lg hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {sending === broadcast.id ? 'Отправка...' : 'Отправить'}
                  </button>
                )}
                {broadcast.sent && (
                  <span className="ml-4 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Отправлено
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
