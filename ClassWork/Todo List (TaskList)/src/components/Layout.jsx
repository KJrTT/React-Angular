import { NavLink } from 'react-router-dom';

function Layout({ children }) {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#3b82f6' : '#374151',
    textDecoration: 'none',
    padding: '8px 12px',
  });

  return (
    <div>
      <nav style={{ display: 'flex', gap: 4, padding: 12, borderBottom: '1px solid #ddd' }}>
        <NavLink to="/" style={linkStyle} end>Главная</NavLink>
        <NavLink to="/tasks" style={linkStyle}>Задачи</NavLink>
      </nav>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;