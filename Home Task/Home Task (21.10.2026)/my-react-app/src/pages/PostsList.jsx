import { Link } from 'react-router-dom';

const posts = [
  { id: 1, title: 'Как выучить React' },
  { id: 2, title: '10 советов по CSS' },
  { id: 3, title: 'Введение в JavaScript' }
];

export default function PostsList() {
  return (
    <div>
      <h1>Все посты</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}