import { useState } from 'react';

// Один элемент списка. Принимает:
//   todo — объект задачи
//   onToggle — переключить done
//   onDelete — удалить
//   onEdit — сохранить новое название
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // Локальное состояние редактирования — НЕ нужно родителю
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Цвет левой полоски по приоритету
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text); // откатываем изменения
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 12px 12px 8px',
        borderBottom: '1px solid #eee',
        borderLeft: `4px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {/* Условный рендер: редактируем или показываем текст */}
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            cursor: 'pointer',
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#999' : '#1e293b',
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Кнопки: показать в режиме редактирования, иначе — удалить */}
      {isEditing ? (
        <>
          <button onClick={handleSave} style={{ cursor: 'pointer' }}>
            💾
          </button>
          <button onClick={handleCancel} style={{ cursor: 'pointer' }}>
            ✖️
          </button>
        </>
      ) : (
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
            color: '#ef4444',
          }}
        >
          ✕
        </button>
      )}
    </li>
  );
}

export default TodoItem;