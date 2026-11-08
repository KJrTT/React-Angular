import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle(''); 
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    mutation.mutate(
      { title, body: 'Новый пост', userId: 1 },
      {
        onError: (err) => alert(`Ошибка: ${err.message}`),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок поста"
        style={{ padding: 8, marginRight: 8 }}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Создание...' : 'Создать'}
      </button>

      {mutation.isError && (
        <p style={{ color: 'red' }}>Ошибка: {mutation.error.message}</p>
      )}
    </form>
  );
}

export default AddPostForm;