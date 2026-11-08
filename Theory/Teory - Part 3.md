# 📘 Часть 3: Состояние (`useState`) и события

## 3.1 Зачем нужно состояние

До этого все компоненты были **статичными**: получили пропсы и отрисовали. Но реальные приложения **меняются во времени**:

- Пользователь кликнул — счётчик увеличился
- Пользователь ввёл текст — он появился в поле
- Пришли данные с сервера — список обновился

**Состояние (state)** — это данные, которые:

1. **Принадлежат компоненту** (не приходят извне как пропсы)
2. **Могут меняться** во время работы
3. **При изменении вызывают перерисовку** компонента

### Ключевая идея React

> **UI = f(state)**

Интерфейс — это функция от состояния. Меняешь состояние → React сам перерисовывает нужные части.

---

## 3.2 Хук `useState`

**Хук** — специальная функция React, которая даёт компоненту дополнительные возможности. Хуки всегда начинаются с `use`.

### Синтаксис

```jsx
import { useState } from 'react';

function Counter() {
  // useState возвращает МАССИВ из двух элементов:
  // 1. Текущее значение состояния
  // 2. Функция для его изменения
  const [count, setCount] = useState(0);
  //    ↑         ↑                ↑
  //  значение  сеттер      начальное значение

  return (
    <button onClick={() => setCount(count + 1)}>
      Кликов: {count}
    </button>
  );
}
```

### Разбор по частям

```jsx
const [count, setCount] = useState(0);
```

Это **деструктуризация массива**. `useState(0)` возвращает `[0, функция]`. Мы сразу разбиваем это на две переменные:

- `count` — текущее значение (сейчас `0`)
- `setCount` — функция, которая меняет `count` и перерисовывает компонент

**Именование:** принято `[имя, setИмя]`. Например: `[user, setUser]`, `[isOpen, setIsOpen]`, `[items, setItems]`.

### Правила хуков

1. **Только внутри компонентов** (или внутри других хуков)
2. **Только на верхнем уровне** — не внутри `if`, `for`, вложенных функций

```jsx
// ❌ НЕЛЬЗЯ — хук внутри условия
function Bad() {
  if (someCondition) {
    const [count, setCount] = useState(0); // ошибка!
  }
}

// ✅ МОЖНО — хук на верхнем уровне, а условие внутри JSX
function Good() {
  const [count, setCount] = useState(0);
  return someCondition ? <p>{count}</p> : null;
}
```

**Почему?** React запоминает порядок хуков. Если порядок меняется между рендерами — всё ломается. Поэтому хуки всегда вызываются в одном и том же порядке.

---

## 3.3 Обновление состояния

### Прямое обновление

```jsx
const [count, setCount] = useState(0);

setCount(5);              // установить 5
setCount(count + 1);      // увеличить на 1
```

### ⚠️ Функциональное обновление (важно!)

Когда новое значение зависит от предыдущего, **используй функцию**:

```jsx
// ❌ Может работать неправильно при нескольких обновлениях подряд
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Итог: count увеличится на 1, а не на 3!
// Потому что все три раза использовалось одно и то же старое count.

// ✅ Правильно — каждый вызов получает актуальное значение
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
// Итог: count увеличится на 3
```

**Правило:** если новое значение зависит от старого — всегда используй `(prev) => ...`.

### Состояние асинхронно

```jsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // выведет СТАРОЕ значение, не новое!
}
```

`setCount` не меняет переменную сразу — он **планирует** обновление. React сделает перерисовку позже, и только тогда `count` станет новым. Внутри текущей функции `count` остаётся старым.

---

## 3.4 Состояние и объекты/массивы

**Главное правило: не мутируй состояние, создавай новое.**

### Массивы

```jsx
const [items, setItems] = useState(['a', 'b']);

// ❌ Мутация — React не увидит изменений, перерисовки не будет
items.push('c');
setItems(items);

// ✅ Создаём новый массив через spread
setItems([...items, 'c']);        // добавить в конец
setItems(['c', ...items]);        // добавить в начало
setItems(items.filter(i => i !== 'a'));  // удалить
setItems(items.map(i => i === 'a' ? 'A' : i));  // заменить
```

### Объекты

```jsx
const [user, setUser] = useState({ name: 'Иван', age: 25 });

// ❌ Мутация
user.age = 26;
setUser(user);

// ✅ Создаём новый объект через spread
setUser({ ...user, age: 26 });          // изменить одно поле
setUser({ ...user, city: 'Москва' });   // добавить поле
```

**Почему?** React сравнивает старое и новое значение **по ссылке** (`===`). Если ты мутируешь тот же объект — ссылка та же, React думает, что ничего не изменилось, и не перерисовывает.

---

## 3.5 Обработчики событий

### Синтаксис

```jsx
// Функция-обработчик передаётся БЕЗ скобок
<button onClick={handleClick}>Нажми</button>

// Можно inline — стрелочную функцию
<button onClick={() => alert('Клик!')}>Нажми</button>

// ❌ Ошибка — вызовется сразу при рендере
<button onClick={handleClick()}>Нажми</button>
```

### Популярные события

|Событие|Когда срабатывает|
|---|---|
|`onClick`|Клик|
|`onChange`|Изменение значения (инпуты)|
|`onSubmit`|Отправка формы|
|`onFocus` / `onBlur`|Получил/потерял фокус|
|`onMouseEnter` / `onMouseLeave`|Наведение мыши|
|`onKeyDown` / `onKeyUp`|Нажатие клавиши|
|`onInput`|Любой ввод в поле|

### Объект события

Обработчик получает **синтетическое событие** (`SyntheticEvent`) — обёртку над нативным:

```jsx
function handleChange(event) {
  console.log(event.target.value);    // значение из инпута
  console.log(event.target.name);     // атрибут name
  console.log(event.target.checked);  // для чекбокса
}

<input onChange={handleChange} />
```

`event.target` — DOM-элемент, на котором произошло событие.

### Передача аргументов

```jsx
// Нужно передать не только event, но и данные
function handleDelete(event, id) {
  event.stopPropagation();  // остановить всплытие
  console.log('Удаляем', id);
}

// Через стрелочную функцию
<button onClick={(e) => handleDelete(e, item.id)}>Удалить</button>
```

---

## 3.6 Управляемые компоненты (controlled components)

**Управляемый инпут** — это инпут, значение которого контролируется состоянием React.

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}                              // значение из state
      onChange={(e) => setName(e.target.value)} // обновляем state при вводе
    />
  );
}
```

**Зачем?**

- Всегда знаешь текущее значение
- Можешь валидировать на лету
- Можешь форматировать (например, только цифры)
- Легко сбрасывать форму

**Правило:** если у инпута есть `value` — обязательно должен быть и `onChange`, иначе поле нельзя будет изменить.

### Разные типы инпутов

```jsx
const [form, setForm] = useState({
  name: '',
  email: '',
  age: '',
  agree: false,
  gender: 'male',
  bio: '',
});

// Универсальный обработчик для всех полей
function handleChange(e) {
  const { name, value, type, checked } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
}

// Text input
<input name="name" value={form.name} onChange={handleChange} />

// Checkbox — использует checked, не value
<input
  type="checkbox"
  name="agree"
  checked={form.agree}
  onChange={handleChange}
/>

// Select
<select name="gender" value={form.gender} onChange={handleChange}>
  <option value="male">Мужской</option>
  <option value="female">Женский</option>
</select>

// Textarea — в React это value, а не children
<textarea name="bio" value={form.bio} onChange={handleChange} />
```

⚠️ **Важно:** в HTML `textarea` заполняется через дочерний текст. В React — через проп `value`.

---

## 3.7 Обработка форм

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // ОБЯЗАТЕЛЬНО — иначе браузер перезагрузит страницу
    console.log({ email, password });
    // Тут обычно отправка на сервер
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
}
```

**`e.preventDefault()`** — обязательно. Без него браузер отправит форму по-старому и перезагрузит страницу, потеряв всё состояние.

---

## 3.8 🎯 Практика Части 3: Todo-приложение (базовая версия)

Соберём полноценный todo-лист. Пока без фильтров — они будут в Части 4.

### `src/App.jsx`

```jsx
import { useState } from 'react';

function App() {
  // ---- Состояние ----
  // Массив задач. Каждая задача — объект { id, text, done }
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true },
    { id: 2, text: 'Разобраться с событиями', done: false },
  ]);

  // Значение инпута (controlled component)
  const [inputValue, setInputValue] = useState('');

  // ---- Обработчики ----

  // Добавить задачу
  function handleAdd() {
    const trimmed = inputValue.trim();
    if (!trimmed) return; // не добавляем пустые

    const newTodo = {
      id: Date.now(), // простой способ получить уникальный id
      text: trimmed,
      done: false,
    };

    // ✅ Создаём НОВЫЙ массив, не мутируем
    setTodos((prev) => [...prev, newTodo]);
    setInputValue(''); // очищаем инпут
  }

  // Переключить done
  function handleToggle(id) {
    // ✅ map создаёт новый массив
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  // Удалить задачу
  function handleDelete(id) {
    // ✅ filter создаёт новый массив
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // ---- Подсчёты ----
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <h1>📝 Todo List</h1>

      {/* Форма добавления. Enter в инпуте тоже сработает благодаря form + onSubmit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        style={{ display: 'flex', gap: 8, marginBottom: 16 }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Что нужно сделать?"
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Добавить
        </button>
      </form>

      {/* Статистика */}
      <p style={{ color: '#666', fontSize: 14 }}>
        Всего: {todos.length} | Активных: {activeCount} | Выполнено: {doneCount}
      </p>

      {/* Пустое состояние */}
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
          Задач пока нет. Добавь первую!
        </p>
      )}

      {/* Список */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            {/* Чекбокс переключает done */}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />

            {/* Текст: если done — зачёркнут */}
            <span
              style={{
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#999' : '#1e293b',
              }}
            >
              {todo.text}
            </span>

            {/* Кнопка удаления */}
            <button
              onClick={() => handleDelete(todo.id)}
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

**Что ты здесь применил:**

- `useState` для массива, строки
- Функциональное обновление (`prev => ...`)
- Иммутабельность: `[...prev, x]`, `.map`, `.filter`
- Controlled input
- Форма с `onSubmit` + `preventDefault`
- События `onChange`, `onClick`
- Условный рендер пустого состояния

**✅ Чек-лист Части 3:**

- [ ]  Понимаю, что такое state и зачем нужен
- [ ]  Умею использовать `useState`
- [ ]  Знаю правила хуков (только верхний уровень)
- [ ]  Использую функциональное обновление `prev => ...`
- [ ]  Не мутирую состояние — создаю новое
- [ ]  Умею делать управляемые инпуты
- [ ]  Знаю, зачем `e.preventDefault()` в формах

---

# 📘 Часть 4: Списки, условия, стили

## 4.1 Списки в React

Мы уже использовали `.map()` — теперь разберём подробно.

### Как рендерить массив

```jsx
const fruits = ['яблоко', 'банан', 'вишня'];

// map превращает массив строк в массив JSX-элементов
<ul>
  {fruits.map((fruit) => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>
```

React умеет рендерить **массивы JSX** — просто вставляет их в разметку.

### Почему `key` критичен

Когда React видит массив, ему нужно понять: **какой элемент какой** при следующем рендере. `key` — уникальный идентификатор для React.

```jsx
// Список [A, B, C]. Пользователь удаляет B.
// Без key: React перерисует ВСЁ, что может вызвать баги с состоянием
// С key: React удалит только B, остальные не тронет
```

### Как выбирать `key`

```jsx
// ✅ Идеально: стабильный уникальный id из данных
{items.map(item => <Item key={item.id} item={item} />)}

// ⚠️ Приемлемо: если в массиве уникальные строки/числа
{skills.map(skill => <li key={skill}>{skill}</li>)}

// ❌ Плохо: index как key
{items.map((item, i) => <Item key={i} item={item} />)}
```

**Почему `index` плох:**

1. При удалении элемента все последующие сдвигаются → React перепутает их
2. Если у элементов есть своё состояние (например, инпут) — оно «переедет» не туда
3. При сортировке списка всё ломается

**Когда `index` допустим:** если список **никогда** не меняет порядок, не фильтруется и не сортируется. Но лучше всегда иметь `id`.

### Вложенные списки

```jsx
{categories.map(category => (
  <div key={category.id}>
    <h3>{category.name}</h3>
    <ul>
      {category.items.map(item => (
        <li key={item.id}>{item.name}</li> // key уникален только среди соседей
      ))}
    </ul>
  </div>
))}
```

Важно: `key` должен быть уникальным **среди соседей** одного списка. То есть `item.id === category.id` — не проблема, потому что они на разных уровнях.

---

## 4.2 Условный рендер

React не имеет `if` внутри JSX — используем JS-выражения.

### Способ 1: `&&` — рендер по условию

```jsx
{isLoggedIn && <Dashboard />}
```

Работает так: если `isLoggedIn === true` → рендерится `<Dashboard />`, иначе — `false`, и React ничего не рендерит.

⚠️ **Осторожно с числами:** `{0 && <Component />}` отрендерит **`0`** на странице, потому что `0` — falsy, но рендерится!

```jsx
// ❌ Покажет "0" на странице, если count = 0
{count && <p>Есть элементы</p>}

// ✅ Явное сравнение
{count > 0 && <p>Есть элементы</p>}
```

### Способ 2: тернарный оператор — if/else

```jsx
{isLoading ? <Spinner /> : <Data />}
```

Для двух вариантов. Читается хорошо, если обе ветки короткие.

### Способ 3: ранний return — для больших условий

```jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>Пользователь не найден</p>;
  }

  return <div>{user.name}</div>;
}
```

Это **самый читаемый** способ, когда у компонента есть «особые» состояния (загрузка, ошибка, пустота).

### Способ 4: словарь-объект — для множества вариантов

```jsx
function StatusIcon({ status }) {
  const icons = {
    loading: '⏳',
    success: '✅',
    error: '❌',
  };
  return <span>{icons[status]}</span>;
}
```

Чище, чем лестница `if/else if/else if`.

### Комбинированный пример: состояния запроса

```jsx
function DataView({ loading, error, data }) {
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  if (!data || data.length === 0) return <p>Данных нет</p>;

  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

Такой паттерн ты будешь писать постоянно.

---

## 4.3 Стилизация в React

### Способ 1: инлайн-стили

```jsx
<div style={{ color: 'red', fontSize: 16, marginTop: 10 }}>
```

**Плюсы:** быстро, локально, зависит от состояния.  
**Минусы:** нет `:hover`, нет медиа-запросов, verbose для больших блоков.

### Способ 2: обычный CSS-файл

```jsx
import './App.css';

<div className="card">...</div>
```

```css
/* App.css */
.card { padding: 20px; border-radius: 8px; }
.card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
```

**Плюсы:** все возможности CSS.  
**Минусы:** глобальная область видимости — легко получить конфликты имён.

### Способ 3: CSS-модули

```css
/* Button.module.css */
.primary { background: blue; color: white; }
.danger { background: red; color: white; }
```

```jsx
import styles from './Button.module.css';

<button className={styles.primary}>ОК</button>
```

**Плюсы:** локальные имена (генерируются уникальные классы), нет конфликтов.  
**Минусы:** чуть больше boilerplate.

### Способ 4: Tailwind CSS (современный стандарт)

```jsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Нажми
</button>
```

**Плюсы:** быстро, консистентно, нет CSS-файлов.  
**Минусы:** длинные className, порог входа.

### Динамические классы

```jsx
// Комбинируем строки через шаблонные литералы или утилиты
<div className={`card ${isActive ? 'card--active' : ''}`}>

// Или через массив + filter + join
<div className={['card', isActive && 'card--active'].filter(Boolean).join(' ')}>
```

---

## 4.4 🎯 Практика Часть 4: Todo-приложение (расширенная версия)

Доработаем todo из Части 3: добавим **фильтры**, **счётчик**, **редактирование** и **приоритеты**.

### Финальная структура

```
src/
├── components/
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── Filters.jsx
├── App.jsx
└── index.css
```

### `src/components/TodoForm.jsx`

```jsx
import { useState } from 'react';

// Форма добавления задачи.
// Принимает onAdd — колбэк от родителя.
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    // Вызываем колбэк родителя, передавая ему данные
    onAdd({ text: trimmed, priority });

    // Сбрасываем форму
    setText('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginBottom: 16 }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />

      {/* Select приоритета */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;
```

### `src/components/Filters.jsx`

```jsx
// Компонент фильтров.
// Принимает:
//   current — текущий фильтр ('all' | 'active' | 'done')
//   onChange — колбэк смены фильтра
//   counts — объект { all, active, done } для отображения чисел
function Filters({ current, onChange, counts }) {
  const filters = [
    { key: 'all', label: 'Все', count: counts.all },
    { key: 'active', label: 'Активные', count: counts.active },
    { key: 'done', label: 'Выполненные', count: counts.done },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {filters.map((filter) => {
        // Тернарник для выбора стиля активной кнопки
        const isActive = filter.key === current;
        return (
          <button
            key={filter.key}
            onClick={() => onChange(filter.key)}
            style={{
              padding: '8px 14px',
              border: '1px solid #ddd',
              borderRadius: 8,
              background: isActive ? '#3b82f6' : 'white',
              color: isActive ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {filter.label} ({filter.count})
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
```

### `src/components/TodoItem.jsx`

```jsx
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
```

**Ключевой момент:** локальное состояние `isEditing` и `editText` живёт **внутри** `TodoItem`. Родителю о процессе редактирования знать не нужно — он получает только финальный `onEdit(id, text)`. Это хороший пример **инкапсуляции**.

### `src/components/TodoList.jsx`

```jsx
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  // Обработка пустого состояния
  if (todos.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
        Здесь пусто 🎉
      </p>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

### `src/App.jsx`

```jsx
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import Filters from './components/Filters';
import TodoList from './components/TodoList';

function App() {
  // ---- Состояние ----
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true, priority: 'high' },
    { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 3, text: 'Сделать todo', done: false, priority: 'low' },
  ]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'

  // ---- Колбэки для детей ----

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

  // ---- Вычисляемые данные ----

  // Подсчёты (пересчитываются при каждом рендере — это нормально для маленьких списков)
  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  // Отфильтрованный список по текущему фильтру.
  // Логика: для 'all' — все; 'active' — только невыполненные; 'done' — только выполненные.
  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; // 'all'
  });

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 20 }}>
      <h1>📝 Todo List</h1>

      <TodoForm onAdd={addTodo} />

      <Filters current={filter} onChange={setFilter} counts={counts} />

      {/* Условный рендер: если фильтр "done" и задач нет — особое сообщение */}
      {filter === 'done' && visibleTodos.length === 0 && counts.all > 0 && (
        <p style={{ color: '#f59e0b', fontStyle: 'italic' }}>
          Пока нет выполненных задач. Отметь что-нибудь ✅
        </p>
      )}

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
```

### `src/index.css`

```css
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background: #f8fafc;
  color: #1e293b;
}

button:hover { opacity: 0.85; }
```

---

## 🔍 Разбор потока данных

```
App (state: todos, filter)
  │
  ├── TodoForm     ← onAdd={addTodo}
  │       → вызывает addTodo({ text, priority }) при сабмите
  │
  ├── Filters      ← current={filter}, onChange={setFilter}, counts
  │       → вызывает setFilter('active') при клике
  │
  └── TodoList     ← todos={visibleTodos}, onToggle, onDelete, onEdit
        │
        └── TodoItem ← todo={todo}, onToggle, onDelete, onEdit
              │
              └── TodoItem имеет СВОЁ локальное состояние isEditing
```

**Принципы:**

1. **`App` владеет всем глобальным состоянием** (`todos`, `filter`)
2. **Дети получают данные через пропсы, изменения — через колбэки**
3. **Локальное состояние (`isEditing`) живёт там, где нужно** — в `TodoItem`
4. **Производные данные (`visibleTodos`, `counts`) считаются в рендере**, не хранятся отдельно

Это классическая архитектура React-приложения.

---

## 🏋️ Упражнения для закрепления

### Часть 3

1. **Счётчик с шагом**: две кнопки `+1` и `-1`, инпут для шага. Счётчик меняется на значение шага.
2. **Переключатель темы**: кнопка, меняющая `light` / `dark`. Фон и цвет текста зависят от состояния.
3. **Форма логина**: email + пароль. Кнопка `Войти` активна только когда оба поля заполнены. При сабмите — `alert`.
4. **Список покупок**: инпут + кнопка. Добавляй товары в массив, позволяй удалять.

### Часть 4

5. **Фильтр по приоритету**: добавь в todo ещё один набор фильтров по `priority`.
6. **Сортировка**: кнопка, переключающая сортировку по алфавиту / по дате добавления.
7. **Поиск**: инпут, фильтрующий задачи по подстроке (регистронезависимо).
8. **Счётчик выполненных**: прогресс-бар, показывающий `done/total` в процентах.
9. **Редактирование с валидацией**: не позволяй сохранить пустое название в `TodoItem`.
10. **Массовые операции**: кнопки «Отметить все», «Удалить выполненные», «Очистить всё».

---

## 📋 Чек-лист самопроверки

**Часть 3:**

- [ ]  Понимаю, что `useState` возвращает массив `[значение, сеттер]`
- [ ]  Знаю правила хуков (только верхний уровень)
- [ ]  Использую функциональное обновление при зависимости от предыдущего
- [ ]  Не мутирую состояние — создаю новое через spread / map / filter
- [ ]  Умею делать управляемые инпуты всех типов
- [ ]  Знаю, зачем `e.preventDefault()` в `onSubmit`
- [ ]  Передаю функции через пропсы, не вызываю их

**Часть 4:**

- [ ]  Всегда ставлю `key` в списках, не `index` (кроме крайних случаев)
- [ ]  Знаю 4 способа условного рендера (&&, тернарник, ранний return, словарь)
- [ ]  Осторожен с `&&` и числами
- [ ]  Умею использовать разные способы стилизации
- [ ]  Понимаю, где хранить состояние: глобальное — в родителе, локальное — в ребёнке
- [ ]  Вычисляю производные данные в рендере, а не дублирую в state