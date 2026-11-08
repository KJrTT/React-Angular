import { useState, useEffect } from 'react';

function CatFact() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function getFact() {
    setLoading(true);
    setError('');
    
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => {
        setFact(data.fact);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки');
        setLoading(false);
      });
  }

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div>
      <h2>Факты о кошках</h2>
      
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fact && <p>{fact}</p>}
      
      <button onClick={getFact}>Ещё</button>
    </div>
  );
}

export default CatFact;