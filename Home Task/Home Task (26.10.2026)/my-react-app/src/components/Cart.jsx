import { useCart, useCartDispatch } from '../hooks/useCart';

export default function Cart() {
  const cart = useCart();
  const dispatch = useCartDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h3>Корзина</h3>
      <button onClick={() => dispatch({ type: 'ADD', payload: { id: 1, name: 'Яблоко', price: 50 } })}>
        Добавить яблоко
      </button>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x{item.qty} — {item.price * item.qty} руб.
            <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}>Удалить</button>
          </li>
        ))}
      </ul>
      <p><strong>Итого: {total} руб.</strong></p>
    </div>
  );
}