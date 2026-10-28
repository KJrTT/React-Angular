import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    body: z.string().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов'),
    userId: z.coerce.number().int().positive('Введите положительное число'),
    tags: z
      .array(z.string().min(2, 'Мин. 2 символа').max(20, 'Макс. 20 символов'))
      .min(1, 'Добавьте хотя бы один тег')
      .max(5, 'Максимум 5 тегов'),
    status: z.enum(['draft', 'published']),
    publishDate: z.string().refine((dateString) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(dateString).setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, { message: 'Дата не может быть в прошлом' }),
  });



  export const defaultPostValues = {
    title: '',
    body: '',
    userId: 1,
    tags: [''],
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0], 
  };