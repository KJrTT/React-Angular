import { useState } from 'react';

function DependentForm() {
  const [country, setCountry] = useState('ru');
  const [city, setCity] = useState('');
  let error = '';
  if (country === 'ru' && city.length < 3 && city.length > 0) {
    error = 'Для России нужно минимум 3 буквы';
  }
  if (country === 'us' && city.length < 2 && city.length > 0) {
    error = 'Для США нужно минимум 2 буквы';
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!error && city) {
      alert(`Город ${city} в стране ${country}`);
    }
  }

  return (
    <div>
      <h2>Форма с зависимостями</h2>
      <form onSubmit={handleSubmit}>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          <option value="ru">Россия</option>
          <option value="us">США</option>
        </select>

        <input 
          value={city} 
          onChange={e => setCity(e.target.value)} 
          placeholder="Город" 
        />
        {error && <span style={{ color: 'red' }}> {error}</span>}

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default DependentForm;