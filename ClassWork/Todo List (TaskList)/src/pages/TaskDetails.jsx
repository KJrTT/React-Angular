import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'tasks-app:v1';

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div>
        <h1>Задача не найдена</h1>
        <p>ID: {taskId}</p>
        <Link to="/tasks">← К списку задач</Link>
      </div>
    );
  }

  function toggleDone() {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask() {
    if (!confirm('Удалить задачу?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    navigate('/tasks');
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Назад
      </button>

      <h1 className={task.done ? 'task-title done' : 'task-title'}>
        {task.title}
      </h1>

      <p>{task.description || 'Без описания'}</p>
      <p className="task-date">
        Создана: {new Date(task.createdAt).toLocaleString()}
      </p>
      <p>Статус: {task.done ? 'Выполнена' : 'Активна'}</p>

      <div className="task-actions">
        <button onClick={toggleDone} className="btn">
          {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
        </button>
        <button onClick={removeTask} className="btn btn-danger">
          Удалить
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;