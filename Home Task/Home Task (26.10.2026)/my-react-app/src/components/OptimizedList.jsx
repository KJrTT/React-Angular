import { useState, memo, useCallback } from 'react';
const Item = memo(function Item({ item, onDelete }) {
  console.log(`Рендер элемента: ${item.name}`);
  return (
    <li>
      {item.name} <button onClick={() => onDelete(item.id)}>Удалить</button>
    </li>
  );
});

export default function OptimizedList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Элемент 1' },
    { id: 2, name: 'Элемент 2' },
    { id: 3, name: 'Элемент 3' },
  ]);
  const [counter, setCounter] = useState(0);
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      <h3>Оптимизация списка</h3>
      <p>Счётчик кликов: {counter} (вызывает ререндер родителя)</p>
      <button onClick={() => setCounter(counter + 1)}>Кликнуть</button>

      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}