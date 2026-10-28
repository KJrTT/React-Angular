import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import PostForm from '../components/PostForm';

function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });
  async function handleCreate(data) {
    await createMutation.mutateAsync(data);
  }

  return (
    <div>
      <h1>Создание поста</h1>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
}

export default NewPostPage;