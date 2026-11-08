import { Routes, Route, NavLink, Outlet } from 'react-router-dom';

import CounterLocal from './components/CounterLocal';
import ThemeLocal from './components/ThemeLocal';
import NoteDraft from './components/NoteDraft';
import ClearStorage from './components/ClearStorage';

import BlogHome from './pages/BlogHome';
import PostsList from './pages/PostsList';
import PostDetail from './pages/PostDetail';
import AdminPage from './pages/AdminPage';
import UsersWithFilter from './pages/UsersWithFilter';

function Layout() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '10px'
  });

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <NavLink to="/" style={linkStyle}>Главная</NavLink>
        <NavLink to="/posts" style={linkStyle}>Посты</NavLink>
        <NavLink to="/users" style={linkStyle}>Пользователи</NavLink>
        <NavLink to="/admin" style={linkStyle}>Админка</NavLink>
        <NavLink to="/local-storage" style={linkStyle}>localStorage</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BlogHome />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/users" element={<UsersWithFilter />} />
        <Route path="/local-storage" element={
          <div>
            <CounterLocal />
            <hr />
            <ThemeLocal />
            <hr />
            <NoteDraft />
            <hr />
            <ClearStorage />
          </div>
        } />
        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Route>
    </Routes>
  );
}