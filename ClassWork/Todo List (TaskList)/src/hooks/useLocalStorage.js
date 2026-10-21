import { useEffect, useState } from 'react';

/**
 * Синхронизирует состояние React с localStorage.
 *
 * @param {string} key — ключ в localStorage
 * @param {any} initialValue — значение по умолчанию (если в хранилище пусто)
 * @returns {[any, Function]} — [значение, сеттер] (как у useState)
 */
export function useLocalStorage(key, initialValue) {
  // Ленивая инициализация: читаем из хранилища только при монтировании
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      // Если ключа нет — используем initialValue.
      // Если initialValue — функция, вызываем её (как в useState).
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      // Битый JSON, запрещённый localStorage (приватный режим) и т.п.
      console.warn(`useLocalStorage: не удалось прочитать "${key}"`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Сохраняем при каждом изменении значения
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // QuotaExceededError или приватный режим
      console.warn(`useLocalStorage: не удалось сохранить "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}