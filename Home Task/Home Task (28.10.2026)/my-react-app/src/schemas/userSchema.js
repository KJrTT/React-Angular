import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Некорректный email'),
    age: z.coerce.number().int().min(18, 'Только с 18 лет'),
    role: z.enum(['admin', 'editor', 'viewer']),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    bio: z.string().max(500, 'Максимум 500 символов').optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], 
  });