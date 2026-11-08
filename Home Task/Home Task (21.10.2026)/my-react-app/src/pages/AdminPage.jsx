import { Navigate, Link } from 'react-router-dom';

export default function AdminPage() {
  const isAdmin = false;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Админ-панель</h1>
      <p>Доступ разрешен.</p>
      <Link to="/">На главную</Link>
    </div>
  );
}