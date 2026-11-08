import { useParams, Link } from 'react-router-dom';

const posts = {
  1: { title: 'Как выучить React', content: 'Текст поста...' },
  2: { title: '10 советов по CSS', content: 'Текст поста...' },
  3: { title: 'Введение в JavaScript', content: 'Текст поста...' }
};

export default function PostDetail() {
  const { id } = useParams();
  const post = posts[id];

  if (!post) return <p>Пост не найден</p>;

  return (
    <div>
      <h2>Хлебные крошки:</h2>
      <nav>
        <Link to="/">Главная</Link> / <Link to="/posts">Посты</Link> / {post.title}
      </nav>

      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/posts">← Назад к списку</Link>
    </div>
  );
}