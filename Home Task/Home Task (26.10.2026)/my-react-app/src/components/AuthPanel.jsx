import { useAuth } from '../hooks/useAuth';

export default function AuthPanel() {
  const { user, login, logout } = useAuth();

  if (user) {
    return (
      <div>
        <h3>Привет, {user.name}!</h3>
        <button onClick={logout}>Выйти</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Вы не авторизованы</h3>
      <button onClick={() => login('Иван')}>Войти как Иван</button>
    </div>
  );
}