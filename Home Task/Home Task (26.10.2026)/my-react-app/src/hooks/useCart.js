import { useContext } from 'react';
import { CartContext, CartDispatchContext } from '../context/AppContext';

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (!ctx) throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}