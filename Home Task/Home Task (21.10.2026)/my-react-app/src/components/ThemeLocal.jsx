import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThemeLocal() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const style = {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    padding: '20px',
    border: '1px solid #ccc'
  };

  return (
    <div style={style}>
      <h3>Тема с сохранением</h3>
      <p>Текущая тема: {theme === 'dark' ? 'Тёмная' : 'Светлая'}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Переключить
      </button>
    </div>
  );
}