import { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function getWeather(e) {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    setTemp(null);

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru`)
      .then(res => res.json())
      .then(data => {
        if (!data.results || data.results.length === 0) {
          setError('Город не найден');
          setLoading(false);
          return;
        }
        
        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
          .then(res => res.json())
          .then(wData => {
            setTemp(wData.current_weather.temperature);
            setLoading(false);
          });
      })
      .catch(() => {
        setError('Что-то пошло не так');
        setLoading(false);
      });
  }

  return (
    <div>
      <h2>Погода</h2>
      <form onSubmit={getWeather}>
        <input 
          value={city} 
          onChange={e => setCity(e.target.value)} 
          placeholder="Город" 
        />
        <button type="submit">Узнать</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {temp !== null && <p>Температура: {temp}°C</p>}
    </div>
  );
}

export default Weather;