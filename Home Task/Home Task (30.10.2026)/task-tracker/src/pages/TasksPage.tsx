import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import type { TaskFormValues } from '../schemas/taskSchema';

type Filter = 'all' | 'favorites';

export default function TasksPage() {
  const queryClient = useQueryClient();
  const { favorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  // ?filter=favorites
  const filter: Filter = searchParams.get('filter') === 'favorites' ? 'favorites' : 'all';

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const mutation = useMutation({
    mutationFn: (values: TaskFormValues) =>
      createTask({
        title: values.title,
        body: values.body,
        userId: values.userId,
        completed: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const visibleTasks = useMemo(() => {
    if (!data) return [];
    const sorted = [...data].sort((a, b) => a.id - b.id);
    if (filter === 'favorites') {
      return sorted.filter((t) => favorites.includes(t.id));
    }
    return sorted;
  }, [data, filter, favorites]);

  function setFilter(next: Filter) {
    if (next === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', next);
    }
    setSearchParams(searchParams);
  }

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p style={{ color: 'red' }}>Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Задачи</h1>

      {/* Фильтр 1.1 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('favorites')}
          disabled={filter === 'favorites'}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          ⭐ Избранные
        </button>
      </div>

      <TaskForm onSubmit={(values) => mutation.mutateAsync(values)} />

      {/* Пустые состояния 1.3 */}
      {visibleTasks.length === 0 && filter === 'favorites' && (
        <EmptyState title="Ты пока ничего не добавил в избранное ⭐" hint="Нажми на звёздочку у задачи" />
      )}
      {visibleTasks.length === 0 && filter === 'all' && (
        <EmptyState title="Задач пока нет. Создай первую!" />
      )}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}