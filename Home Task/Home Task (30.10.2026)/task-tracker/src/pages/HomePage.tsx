import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Трекер задач</h1>
      <p>Веди задачи, добавляй в избранное, удаляй оптимистично.</p>
      <Link to="/tasks" style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
        Перейти к задачам
      </Link>
    </div>
  );
}