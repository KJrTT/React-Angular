import { Link } from 'react-router-dom';

function TaskListItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <Link
        to={`/tasks/${task.id}`}
        className={task.done ? 'task-link done' : 'task-link'}
      >
        {task.title}
      </Link>

      <button onClick={() => onDelete(task.id)} className="btn-delete">
        ✕
      </button>
    </li>
  );
}

export default TaskListItem;