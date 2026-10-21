import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'tasks-app:v1';

const demoTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Изучить React Router',
    description: 'Разобраться с Routes, Route, Link, useParams',
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Сделать todo с localStorage',
    description: 'Синхронизировать состояние через кастомный хук',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Добавить фильтры',
    description: 'Хранить фильтр в query-параметре ?filter=active',
    done: false,
    createdAt: new Date().toISOString(),
  },
];

function Home() {
  const [tasks] = useLocalStorage(STORAGE_KEY, demoTasks);
  const navigate = useNavigate();

  const done = tasks.filter((t) => t.done).length;
  const active = tasks.length - done;

  return (
    <div>
      <h1>Мои задачи</h1>
      <p>Добро пожаловать! Здесь ты управляешь своими задачами.</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
        <li>Всего: {tasks.length}</li>
        <li>Выполнено: {done}</li>
        <li>Активно: {active}</li>
      </ul>

      <button onClick={() => navigate('/tasks')} style={{ padding: '10px 20px' }}>
        Перейти к задачам
      </button>
    </div>
  );
}

export default Home;