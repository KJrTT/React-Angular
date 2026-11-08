# Теория по React (Части 1–2) 

---

## Часть 1. Основы React, окружение и JSX

### 1.1 Что такое React и какую проблему он решает


**React** — это JS-библиотека для создания пользовательских интерфейсов. Её главная идея — **декларативность**. Вы описываете, *как должен выглядеть* интерфейс при определённых данных, а библиотека сама приводит DOM в соответствие с этим описанием.

#### Проблемы «ванильного» подхода
До появления React (и подобных библиотек) разработчики писали императивный код:
```js
const counter = document.getElementById('counter');
let count = 0;

document.getElementById('btn').addEventListener('click', () => {
  count++;
  counter.textContent = count;           // ручное обновление
  document.title = `Кликов: ${count}`;    // ещё одно ручное обновление
});
```
Чем больше элементов зависит от одного состояния, тем легче забыть обновить какой-то из них. Это приводит к **рассинхронизации данных и UI**. Кроме того, такой код трудно переиспользовать.

#### Декларативный подход React
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Кликов: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
Здесь мы говорим: «если `count` равен 5, покажи 5». React сам перерисует нужный кусок интерфейса, когда состояние изменится.

#### Virtual DOM — как React это делает
1. React хранит в памяти лёгкое дерево-описание интерфейса (Virtual DOM).
2. При изменении данных (состояния или пропсов) React строит **новое** дерево.
3. Новое дерево **сравнивается** со старым (процесс *diffing*).
4. Вычисляется минимальный набор изменений.
5. Эти изменения применяются к **реальному** DOM (процесс *reconciliation*).

Это не означает, что React всегда быстрее чистого JS: на очень простых операциях он проигрывает. Его сила — в **предсказуемости** и **удобстве поддержки** больших интерфейсов.

---

### 1.2 Окружение: почему Vite

**Vite** — это сборщик, который использует нативные ES-модули в браузере для мгновенной загрузки кода во время разработки. По сравнению с `create-react-app` (CRA):
- запуск dev-сервера занимает ~300 мс вместо ~10 секунд;
- изменения в коде отображаются мгновенно (HMR — Hot Module Replacement);
- CRA официально устарел (deprecated с 2023 года).

#### Создание проекта
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

#### Структура проекта
```text
my-app/
├── node_modules/          # зависимости (не коммитим в Git)
├── public/                # статика: favicon, картинки, robots.txt
├── src/                   # ВЕСЬ ваш код
│   ├── assets/            # картинки, которые импортируются в JSX
│   ├── components/        # переиспользуемые компоненты
│   ├── App.jsx            # корневой компонент
│   ├── App.css
│   ├── main.jsx           # точка входа
│   └── index.css          # глобальные стили
├── index.html             # единственный HTML-файл
├── package.json           # скрипты и зависимости
└── vite.config.js         # настройки Vite
```

#### Точка входа `main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Находим <div id="root"> в index.html
// 2. Создаём корень React-приложения
// 3. Рендерим в него <App />
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
**StrictMode** — режим только для разработки. Он не влияет на production-сборку, но:
- выводит предупреждения о плохих практиках;
- намеренно вызывает некоторые функции (например, эффекты и конструкторы) **дважды**, чтобы помочь найти побочные эффекты.

#### `index.html`
```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My React App</title>
  </head>
  <body>
    <!-- Сюда React отрендерит всё приложение -->
    <div id="root"></div>
    <!-- Vite подключает main.jsx как ES-модуль -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
> **Важно:** в SPA (Single Page Application) **всегда один HTML-файл**. Маршрутизация между «страницами» делается на клиенте (React Router), а не сервером.

---

### 1.3 JSX — синтаксис описания разметки

**JSX** — это расширение синтаксиса JavaScript, которое позволяет писать HTML-подобный код внутри JS. Браузеры его не понимают, поэтому Vite (через Babel/esbuild) **транслирует** его в обычные вызовы:

```jsx
const el = <h1 className="title">Привет!</h1>;
// ↓ превращается в
const el = React.createElement('h1', { className: 'title' }, 'Привет!');
```

#### Правило 1. Один корневой элемент (или Fragment)
JSX-выражение всегда должно возвращать **один** корневой узел.

```jsx
// Синтаксическая ошибка: два элемента на верхнем уровне
return (
  <h1>Заголовок</h1>
  <p>Текст</p>
);

// Обёртка в <div> (создаст лишний DOM-узел)
return (
  <div>
    <h1>Заголовок</h1>
    <p>Текст</p>
  </div>
);

// Fragment: не создаёт DOM-узла
return (
  <>
    <h1>Заголовок</h1>
    <p>Текст</p>
  </>
);
```
Fragment можно записать и полной формой `<React.Fragment>...</React.Fragment>` — это нужно, если ему требуется атрибут `key` (например, при рендере списка фрагментов).

#### Правило 2. Все теги должны быть закрыты
В отличие от HTML, в JSX нельзя опускать закрывающие теги:
```jsx
// не правильно
<img src="photo.jpg">
<br>
<input type="text">

// правильно
<img src="photo.jpg" />
<br />
<input type="text" />
```

#### Правило 3. Имена атрибутов в camelCase
JSX использует DOM-свойства, а не HTML-атрибуты:
| HTML | JSX |
|---|---|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `tabindex` | `tabIndex` |
| `maxlength` | `maxLength` |
| `style="color: red"` | `style={{ color: 'red' }}` |

```jsx
<label htmlFor="name">Имя</label>
<input id="name" className="input" onChange={handleChange} maxLength={20} />
```

#### Правило 4. Вставка JS-выражений через `{}`
В фигурные скобки можно вставлять **любое** JS-выражение:
```jsx
const name = 'Иван';
const age = 25;
const isLoggedIn = true;
const skills = ['JS', 'React'];

return (
  <div>
    <p>Привет, {name}!</p>
    <p>Через год будет {age + 1}</p>
    <p>Верхний регистр: {name.toUpperCase()}</p>
    <p>{isLoggedIn ? 'Выйти' : 'Войти'}</p>
    <p>{skills.length} навыков</p>
    <p>{skills.join(', ')}</p>
  </div>
);
```
**Что нельзя класть в `{}`:**
- Управляющие инструкции (`if`, `for`, `while`);
- Объявления переменных (`const x = ...`).

```jsx
// Не работает
{ if (x > 0) { return 'positive' } }

// Тернарник
{ x > 0 ? 'positive' : 'negative' }

// Логика до return
const label = x > 0 ? 'positive' : 'negative';
return <p>{label}</p>;
```

#### Правило 5. Инлайн-стили — объект
Используются **двойные фигурные скобки**: первая — вставка JS, вторая — литерал объекта.

```jsx
<div
  style={{
    color: 'red',
    fontSize: '20px',
    marginTop: 10,           // число → 10px
    backgroundColor: '#eee',
  }}
>
  Текст
</div>
```
- Свойства — в camelCase (`fontSize`, `backgroundColor`).
- Числа автоматически получают `px` (кроме безразмерных свойств вроде `opacity`, `zIndex`, `flex`).
- Для CSS-переменных используется строка: `style={{ '--main-color': 'red' }}`.

Для сложных стилей лучше выносить их в CSS-файл и использовать `className`.

#### Правило 6. Комментарии
Внутри JSX комментарии оформляются как `{/* ... */}`. Обычные `//` и `/* */` работают только **вне** JSX.

```jsx
<div>
  {/* Это комментарий в JSX */}
  <p>Текст</p>
  {/* Многострочный
      комментарий */}
</div>
```

---

## Часть 2. Компоненты и пропсы

### 2.1 Что такое компонент

**Компонент** — это функция, возвращающая JSX. Компоненты — строительные блоки React-приложения. Они образуют **дерево**: один компонент может содержать другие.

```jsx
function Welcome() {
  return <h1>Привет!</h1>;
}
```

#### Правила компонентов
1. **Имя с большой буквы.** `<Welcome />` — компонент, `<welcome />` — HTML-тег (которого нет). React отличает их именно по регистру.
2. **Возвращает JSX или `null`.** `null` — если компонент не должен ничего отображать.
3. **Чистая функция.** При одинаковых входных данных компонент возвращает одинаковый JSX и не изменяет внешние переменные.

#### Зачем компоненты
- **Переиспользование.** Одна кнопка — в десяти местах.
- **Инкапсуляция.** Логика и разметка живут рядом.
- **Читаемость.** Приложение — это дерево осмысленных блоков.
- **Тестируемость.** Каждый компонент можно проверить отдельно.

---

### 2.2 Создание и использование компонентов

Компоненты принято выносить в отдельные файлы в папке `src/components/`.

```jsx
// src/components/Header.jsx
function Header() {
  return (
    <header style={{ borderBottom: '2px solid #333', paddingBottom: 10 }}>
      <h1>Моё приложение</h1>
    </header>
  );
}

export default Header;
```

```jsx
// src/App.jsx
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <p>Контент страницы</p>
      </main>
    </div>
  );
}

export default App;
```

#### Виды экспорта
```jsx
// 1. Default export (один на файл)
export default Header;
import Header from './Header';           // имя при импорте может быть любым

// 2. Named export (сколько угодно на файл)
export function Header() {}
export function Footer() {}
import { Header, Footer } from './components';
```
**Договорённость:** компоненты — `default export`, вспомогательные функции/хуки — `named export`.

---

### 2.3 Пропсы — передача данных в компонент

**Пропсы** (properties) — входные параметры компонента. Они передаются от родителя к ребёнку как атрибуты JSX.

```jsx
// Родитель
<User name="Иван" age={25} isAdmin={true} />
```

```jsx
// Ребёнок — получает объект props
function User(props) {
  return <p>{props.name}, {props.age} лет</p>;
}
```

#### Деструктуризация — стандартный способ
```jsx
function User({ name, age, isAdmin }) {
  return (
    <div>
      <p>{name}, {age} лет</p>
      {isAdmin && <span>Админ</span>}
    </div>
  );
}
```

#### Типы значений в пропсах
```jsx
<StringProp  text="привет" />                 {/* строка — кавычки */}
<NumberProp  count={42} />                    {/* число — {} */}
<BoolProp    isActive={true} />               {/* boolean */}
<BoolProp    isActive />                      {/* сокращение = {true} */}
<ArrayProp   items={['a', 'b', 'c']} />       {/* массив */}
<ObjectProp  user={{ name: 'Иван', age: 25 }} /> {/* объект — двойные {} */}
<FuncProp    onSave={() => console.log(1)} /> {/* функция */}
```

#### Значения по умолчанию
```jsx
function Button({ text = 'Кнопка', color = 'blue' }) {
  return <button style={{ color }}>{text}</button>;
}

<Button />                    // "Кнопка", синяя
<Button text="Отправить" />   // "Отправить", синяя
```

#### Пропс `children`
Особый пропс: всё, что помещено **между** тегами компонента, попадает в `children`.

```jsx
function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
      {children}
    </div>
  );
}

<Card>
  <h2>Заголовок</h2>
  <p>Текст внутри карточки</p>
</Card>
```
`children` может быть строкой, JSX-элементом, массивом элементов или даже функцией (паттерн *render props*). Это основной инструмент **композиции** в React.

---

### 2.4 Ключевые принципы пропсов

#### Пропсы только для чтения (read-only)
```jsx
// Мутация пропсов — ошибка
function User(props) {
  props.name = 'Другое имя';   // так делать нельзя
  return <p>{props.name}</p>;
}
```
Если компоненту нужно «изменить» данные родителя, родитель передаёт **функцию-колбэк**:

```jsx
function App() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(count + 1)} />;
}

function Child({ count, onIncrement }) {
  return (
    <>
      <p>{count}</p>
      <button onClick={onIncrement}>+1</button>
    </>
  );
}
```
Здесь ребёнок **не меняет** `count` сам — он просит родителя сделать это через колбэк. Такой поток данных называют **однонаправленным** (top-down).

#### Композиция вместо наследования
React не поддерживает наследование компонентов. Вместо этого — композиция:
```jsx
// через children
<Modal>
  <Form />
</Modal>

// через пропсы
<Layout header={<Header />} footer={<Footer />} />
```

---

### 2.5 Рендеринг списков и атрибут `key`

Списки рендерятся через `.map()` — он превращает массив данных в массив JSX-элементов.

```jsx
function SkillList({ skills }) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>{skill.name}</li>
      ))}
    </ul>
  );
}
```

#### Зачем нужен `key`
Когда React сравнивает новое и старое деревья, ему нужно однозначно опознать каждый элемент списка. `key` — это **уникальный идентификатор**, по которому React понимает: «этот элемент остался, а этот — новый / удалён / переехал».

Без `key` (или с неправильным `key`) React может:
- лишний раз пересоздавать DOM-узлы;
- терять состояние компонентов при переупорядочивании;
- выдавать предупреждение в консоль.

#### Хороший и плохой `key`
```jsx
// index как key — ломается при сортировке, фильтрации, удалении
{items.map((item, index) => <Item key={index} item={item} />)}

// стабильный уникальный id
{items.map((item) => <Item key={item.id} item={item} />)}

// если id нет, но значения уникальны — можно использовать их
{skills.map((skill) => <li key={skill}>{skill}</li>)}
```
**Требования к `key`:** стабильный (не меняется между рендерами), уникальный среди соседей, не `index` (кроме случая, когда список статичен и никогда не меняет порядок).

---

### 2.6 Полный пример: каталог студентов

Ниже — небольшое приложение, в котором собраны все концепции: компоненты, пропсы, деструктуризация, `children` неявно, списки, `key`, вычисления до `return`.

#### Данные `src/data/students.js`
```js
export const students = [
  { id: 1, name: 'Анна Иванова',   age: 20, gpa: 4.8, skills: ['JS', 'React'] },
  { id: 2, name: 'Пётр Смирнов',   age: 22, gpa: 4.2, skills: ['Python', 'SQL'] },
  { id: 3, name: 'Мария Козлова',  age: 19, gpa: 4.9, skills: ['HTML', 'CSS'] },
];
```

#### `src/components/StatCard.jsx`
```jsx
function StatCard({ label, value, color = '#f0f0f0' }) {
  return (
    <div style={{ background: color, padding: 16, borderRadius: 10, flex: 1 }}>
      <div style={{ fontSize: 24, fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: 13, color: '#555' }}>{label}</div>
    </div>
  );
}
export default StatCard;
```

#### `src/components/StudentCard.jsx`
```jsx
function StudentCard({ student }) {
  const { name, age, gpa, skills } = student;
  const courseColor = gpa >= 4.5 ? '#28a745' : '#ffc107';

  return (
    <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 12 }}>
      <h3>{name}</h3>
      <p>Возраст: {age}</p>
      <p style={{ color: courseColor }}>GPA: {gpa}</p>

      <div style={{ display: 'flex', gap: 6 }}>
        {skills.map((skill) => (
          <span key={skill} style={{ background: '#eef2ff', padding: '2px 8px' }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
export default StudentCard;
```

#### `src/components/StudentList.jsx`
```jsx
import StudentCard from './StudentCard';

function StudentList({ students }) {
  if (students.length === 0) return <p>Студентов нет 😔</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {students.map((s) => (
        <StudentCard key={s.id} student={s} />
      ))}
    </div>
  );
}
export default StudentList;
```

#### `src/App.jsx`
```jsx
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import { students } from './data/students';

function App() {
  const total = students.length;
  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / total;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <StatCard label="Всего студентов" value={total}       color="#e0f2fe" />
        <StatCard label="Средний балл"    value={avgGpa.toFixed(2)} color="#dcfce7" />
      </div>

      <StudentList students={students} />
    </div>
  );
}
export default App;
```


Здесь работают все принципы: однонаправленный поток (сверху вниз), композиция (`App` собирает `StudentList`, `StudentList` собирает `StudentCard`), переиспользование (`StatCard` используется дважды с разными пропсами), деструктуризация для читаемости, стабильные `key`.