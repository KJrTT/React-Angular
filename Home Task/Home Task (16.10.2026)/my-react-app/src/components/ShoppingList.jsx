import { useState } from 'react';

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
          placeholder="Что купить?" 
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => handleDelete(item.id)}>✕</button>
          </li>
        ))}</ul></div>
  );
}
export default ShoppingList;