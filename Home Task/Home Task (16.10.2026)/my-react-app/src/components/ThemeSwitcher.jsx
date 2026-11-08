import { useState } from 'react';

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const themeStyle = {
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    padding: '20px',
    border: '1px solid #ccc',
    marginTop: '10px'
  };

  return (
    <div style={themeStyle}>
      <h2>Текущая тема: {isDark ? 'Тёмная' : 'Светлая'}</h2>
      <button onClick={() => setIsDark(!isDark)}>
        Переключить тему
      </button>
    </div>
  );
}
export default ThemeSwitcher;