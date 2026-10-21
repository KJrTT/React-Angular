import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskForm from '../components/TaskForm';
import TaskListItem from '../components/TaskListItem';
import { demoTasks } from '../data/demoTasks';

const STORAGE_KEY = 'tasks-app:v1';

const FILTERS = ['all', 'active', 'done'];

const FILTER_LABELS = {
  all: 'Все',
  active: 'Активные',
  done: 'Выполненные',
};

function Tasks() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, demoTasks);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterFromUrl = searchParams.get('filter');
  const filter = FILTERS.includes(filterFromUrl) ? filterFromUrl : 'all';

  function setFilter(nextFilter) {
    if (nextFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: nextFilter });
    }
  }

  function addTask({ title, description }) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id) {
    if (!confirm('Удалить задачу?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; 
  });

  return (
    <div>
      <h1>Задачи</h1>

      <TaskForm onAdd={addTask} />

      <div className="filters">
        {FILTERS.map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={filter === key ? 'filter-btn active' : 'filter-btn'}
          >
            {FILTER_LABELS[key]}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">Пусто</p>
      ) : (
        <ul className="tasks-list">
          {visibleTasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;