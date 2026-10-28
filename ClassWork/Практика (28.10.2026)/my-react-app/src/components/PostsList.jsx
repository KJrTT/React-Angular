import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

function PostsList() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <p>Загрузка постов...</p>;
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
      {/* isFetching — true при фоновом обновлении, даже если данные уже есть */}
      {isFetching && <p style={{ color: '#888' }}>Обновление...</p>}

      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p style={{ fontSize: 13, color: '#666' }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;