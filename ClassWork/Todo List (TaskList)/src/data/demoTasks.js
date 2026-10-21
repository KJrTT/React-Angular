export const demoTasks = [
    {
      id: crypto.randomUUID(),
      title: 'Изучить React Router',
      description: 'Разобраться с Routes, Route, Link, useParams',
      done: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Сделать todo с localStorage',
      description: 'Синхронизировать состояние через кастомный хук',
      done: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Добавить фильтры',
      description: 'Хранить фильтр в query-параметре ?filter=active',
      done: false,
      createdAt: new Date().toISOString(),
    },
  ];