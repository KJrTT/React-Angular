import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ClearStorage() {
  const [, setCount] = useLocalStorage('counter', 0);
  const [, setTheme] = useLocalStorage('theme', 'light');
  const [, setDraft] = useLocalStorage('note-draft', '');

  function handleClear() {
    if (confirm('Вы уверены, что хотите сбросить все сохраненные данные?')) {
      setCount(0);
      setTheme('light');
      setDraft('');
    }
  }

  return (
    <div>
      <h3>Сброс данных</h3>
      <button onClick={handleClear} style={{ color: 'red' }}>
        Сбросить всё
      </button>
    </div>
  );
}