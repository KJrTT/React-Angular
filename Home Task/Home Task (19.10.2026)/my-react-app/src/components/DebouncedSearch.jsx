import { useState, useEffect } from 'react';

function DebouncedSearch() {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!text) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${text}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <h2>Поиск</h2>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Найти пост..." 
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DebouncedSearch;