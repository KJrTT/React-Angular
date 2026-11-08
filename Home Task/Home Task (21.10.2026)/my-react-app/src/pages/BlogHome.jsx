import { Link } from 'react-router-dom';

export default function BlogHome() {
  return (
    <div>
      <h1>Главная страница блога</h1>
      <Link to="/posts">Смотреть все посты</Link>
    </div>
  );
}