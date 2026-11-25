import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, defaultTaskValues, type TaskFormValues } from '../schemas/taskSchema';

interface TaskFormProps {
  onSubmit: (data: TaskFormValues) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: defaultTaskValues,
  });

  async function handleFormSubmit(data: TaskFormValues) {
    await onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div>
        <input {...register('title')} placeholder="Заголовок" style={{ width: '100%', padding: 8 }} />
        {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
      </div>

      <div>
        <textarea {...register('body')} placeholder="Описание" rows={3} style={{ width: '100%', padding: 8 }} />
        {errors.body && <p style={{ color: 'red' }}>{errors.body.message}</p>}
      </div>

      <div>
        <input type="number" {...register('userId')} placeholder="Автор (userId)" style={{ padding: 8 }} />
        {errors.userId && <p style={{ color: 'red' }}>{errors.userId.message}</p>}
      </div>

      <div>
        <select {...register('priority')} style={{ padding: 8 }}>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <button type="submit" disabled={!isValid || isSubmitting} style={{ padding: 10 }}>
        {isSubmitting ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
}