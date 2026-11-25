import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavorites } from '../context/FavoritesContext';
import { deleteTask, type ApiTask } from '../api/tasks';

interface TaskCardProps {
  task: ApiTask;
}

const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(task.id);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => deleteTask(task.id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData<ApiTask[]>(['tasks']);

      queryClient.setQueryData<ApiTask[]>(['tasks'], (old) =>
        old ? old.filter((t) => t.id !== task.id) : []
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['tasks'], context.previous);
      }
      alert('Не удалось удалить задачу — она возвращена в список');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        borderBottom: '1px solid #eee',
      }}
    >
      <button
        onClick={() => toggleFavorite(task.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
        aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
      >
        {fav ? '⭐' : '☆'}
      </button>
      <Link to={`/tasks/${task.id}`} style={{ flex: 1 }}>
        {task.title}
      </Link>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        style={{ padding: '4px 10px', cursor: 'pointer', color: '#b91c1c' }}
      >
        {mutation.isPending ? '...' : 'Удалить'}
      </button>
    </li>
  );
});

export default TaskCard;