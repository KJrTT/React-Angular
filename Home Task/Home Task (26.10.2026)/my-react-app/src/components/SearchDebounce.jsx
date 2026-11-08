import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchDebounce() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const isTyping = query !== debouncedQuery;

  useEffect(() => {
    if (debouncedQuery) {
      setResult(`Результат поиска по запросу: "${debouncedQuery}"`);
    } else {
      setResult('');
    }
  }, [debouncedQuery]);

  return (
    <div>
      <h3>Поиск с debounce</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Введите текст..." />
      {isTyping && <span style={{ color: 'gray' }}> (печатает...)</span>}
      <p>{result}</p>
    </div>
  );
}