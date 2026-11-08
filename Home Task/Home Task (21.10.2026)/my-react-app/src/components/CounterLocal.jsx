import { useLocalStorage } from '../hooks/useLocalStorage';

export default function CounterLocal() {
  const [count, setCount] = useLocalStorage('counter', 0);

  return (
    <div>
      <h3>Счётчик с сохранением</h3>
      <p>Значение: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Сбросить</button>
    </div>
  );
}