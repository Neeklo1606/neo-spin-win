import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface User {
  id: number;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(`/users?page=${page}&limit=20`);
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gold-text">Пользователи</span>
        </h1>
        <p className="text-muted-foreground">Всего: {total}</p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-muted-foreground">Нет пользователей</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-secondary rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-bold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">@{user.username || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">ID: {user.telegramId}</p>
                  {user.phone && (
                    <p className="text-sm text-muted-foreground">Телефон: {user.phone}</p>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50"
          >
            Назад
          </button>
          <span className="text-muted-foreground">
            Страница {page} из {Math.ceil(total / 20)}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(total / 20)}
            className="px-4 py-2 bg-secondary rounded-lg disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  );
}
