import { useSearchParams } from 'react-router-dom';

const users = [
  { id: 1, name: 'Анна', city: 'Москва' },
  { id: 2, name: 'Пётр', city: 'Санкт-Петербург' },
  { id: 3, name: 'Мария', city: 'Москва' }
];

export default function UsersWithFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityFilter = searchParams.get('city') || '';

  function handleFilterChange(city) {
    if (city) {
      setSearchParams({ city });
    } else {
      setSearchParams({});
    }
  }

  const filteredUsers = cityFilter
    ? users.filter(u => u.city === cityFilter)
    : users;

  return (
    <div>
      <h1>Пользователи (Фильтр: {cityFilter || 'все'})</h1>

      <div>
        <button onClick={() => handleFilterChange('')}>Все</button>
        <button onClick={() => handleFilterChange('Москва')}>Москва</button>
        <button onClick={() => handleFilterChange('Санкт-Петербург')}>Санкт-Петербург</button>
      </div>

      <ul>
        {filteredUsers.map(u => (
          <li key={u.id}>{u.name} ({u.city})</li>
        ))}
      </ul>
    </div>
  );
}