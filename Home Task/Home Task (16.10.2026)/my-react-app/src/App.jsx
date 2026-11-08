import { useState } from 'react';

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Счётчик с шагом</h2>
      <p>Текущее значение: {count}</p>
      <button onClick={() => setCount((prev) => prev - step)}>Минус {step}</button>
      <button onClick={() => setCount((prev) => prev + step)}>Плюс {step}</button>
      
      <div>
        <label>Шаг: </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(Number(e.target.value))} 
        />
      </div>
    </div>
  );
}

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  const themeStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    padding: '20px',
    border: '1px solid #ccc',
    marginBottom: '20px'
  };

  return (
    <div style={themeStyle}>
      <h2>Переключатель темы</h2>
      <p>Текущая тема: {isDark ? 'Тёмная' : 'Светлая'}</p>
      <button onClick={() => setIsDark(!isDark)}>
        Переключить тему
      </button>
    </div>
  );
}

















function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Вы вошли с email: ${email}`);
  }

  const isValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="email" 
            placeholder="Введите email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Введите пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" disabled={!isValid}>
          Войти
        </button>
      </form>
    </div>
  );
}

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, { id: Date.now(), name: trimmed }]);
    setInputValue('');
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter(item => item.id !== id));
  }

  return (
    <div>
      <h2>Список покупок</h2>
      <div>
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Название товара" 
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    
    onAdd({ text: trimmed, priority });
    setText('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Низкий приоритет</option>
        <option value="medium">Средний приоритет</option>
        <option value="high">Высокий приоритет</option>
      </select>
      <button type="submit">Добавить задачу</button>
    </form>
  );
}

function Filters({ current, onChange, counts }) {
  const filters = [
    { key: 'all', label: 'Все', count: counts.all },
    { key: 'active', label: 'Активные', count: counts.active },
    { key: 'done', label: 'Выполненные', count: counts.done },
  ];

  return (
    <div>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          disabled={filter.key === current}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    const trimmed = editText.trim();
    if (!trimmed) {
      alert('Название задачи не может быть пустым!');
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.done} 
        onChange={() => onToggle(todo.id)} 
      />

      {isEditing ? (
        <div>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={handleCancel}>Отмена</button>
        </div>
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button onClick={() => onDelete(todo.id)}>Удалить</button>
      )}
    </li>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true, priority: 'high' },
    { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 3, text: 'Сделать todo', done: false, priority: 'low' },
  ]);
  
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  function addTodo({ text, priority }) {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  function markAllDone() {
    setTodos((prev) => prev.map((t) => ({ ...t, done: true })));
  }

  function deleteCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function clearAll() {
    if (window.confirm('Удалить все задачи?')) {
      setTodos([]);
    }
  }

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  const progressPercent = counts.all === 0 ? 0 : Math.round((counts.done / counts.all) * 100);

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active' && t.done) return false;
    if (filter === 'done' && !t.done) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedTodos = [...visibleTodos].sort((a, b) => {
    if (sortBy === 'alpha') {
      return a.text.localeCompare(b.text);
    }
    return a.id - b.id;
  });

  return (
    <div>
      <h1>Мои задачи</h1>

      <TodoForm onAdd={addTodo} />
      
      <div>
        <Filters current={filter} onChange={setFilter} counts={counts} />
        
        <div>
          <label>Приоритет: </label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">Все</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>

        <div>
          <button onClick={() => setSortBy(sortBy === 'date' ? 'alpha' : 'date')}>
            Сортировка: {sortBy === 'date' ? 'По дате добавления' : 'По алфавиту'}
          </button>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Поиск задач..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      <div>
        <p>Выполнено: {counts.done} из {counts.all} ({progressPercent}%)</p>
        <progress value={counts.done} max={counts.all || 1} />
      </div>

      <div>
        <button onClick={markAllDone}>Отметить все</button>
        <button onClick={deleteCompleted}>Удалить выполненные</button>
        <button onClick={clearAll}>Очистить всё</button>
      </div>

      {sortedTodos.length === 0 ? (
        <p>Здесь пусто</p>
      ) : (
        <ul>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Домашнее задание</h1>
      
      <StepCounter />
      <hr />
      
      <ThemeSwitcher />
      <hr />
      
      <LoginForm />
      <hr />
      
      <ShoppingList />
      <hr />
      
      <TodoApp />
    </div>
  );
}

export default App;