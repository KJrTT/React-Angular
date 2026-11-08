import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ background: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000', padding: 10 }}>
      <h3>Тема: {theme}</h3>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>Переключить</button>
    </div>
  );
}