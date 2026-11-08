import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

export default function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <h3>Предыдущее значение</h3>
      <p>Сейчас: {count}</p>
      <p>Было: {prevCount !== undefined ? prevCount : 'нет'}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}