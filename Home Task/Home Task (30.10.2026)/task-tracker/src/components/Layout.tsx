import { NavLink, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Layout() {
  const { favorites, clearFavorites } = useFavorites();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? '#fff' : '#374151',
    background: isActive ? '#3b82f6' : 'transparent',
  });

  return (
    <div>
      <header
        style={{
          display: 'flex',
          gap: 4,
          padding: 12,
          borderBottom: '1px solid #e5e7eb',
          alignItems: 'center',
        }}
      >
        <NavLink to="/" style={linkStyle} end>
          Главная
        </NavLink>
        <NavLink to="/tasks" style={linkStyle}>
          Задачи
        </NavLink>

        <span style={{ marginLeft: 'auto', fontSize: 14 }}>⭐ {favorites.length}</span>
        {favorites.length > 0 && (
          <button onClick={clearFavorites} style={{ marginLeft: 8, padding: '4px 10px', cursor: 'pointer' }}>
            Очистить
          </button>
        )}
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}