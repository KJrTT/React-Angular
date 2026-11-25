import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTask } from '../api/tasks';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => getTask(id!),
    enabled: !!id,
    retry: false,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError || !data) {
    return (
      <div>
        <p>Задача не найдена</p>
        <Link to="/tasks">← К списку</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/tasks">← К списку</Link>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <p style={{ color: '#888', fontSize: 13 }}>Автор: userId {data.userId}</p>
    </div>
  );
}