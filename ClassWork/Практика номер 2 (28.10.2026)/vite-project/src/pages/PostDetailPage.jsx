import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPost, deletePost } from '../api/posts';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    retry: false, 
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['posts', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return (
    <div>
      <p style={{ color: 'red' }}>{error.message}</p>
      <Link to="/posts">Вернуться к списку</Link>
    </div>
  );

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Link to={`/posts/${id}/edit`}>
          <button>Редактировать</button>
        </Link>
        <button 
          onClick={() => deleteMutation.mutate(id)}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
        </button>
        <Link to="/posts">
          <button>Назад</button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;