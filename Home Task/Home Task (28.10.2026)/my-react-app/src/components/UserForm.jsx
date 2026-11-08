import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/userSchema';

function UserForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange', 
    defaultValues: {
      name: '',
      email: '',
      age: '',
      role: 'viewer',
      password: '',
      confirmPassword: '',
      bio: '',
    },
  });

  async function handleFormSubmit(data) {
    await onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div>
        <label>Имя</label>
        <input {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Возраст</label>
        <input type="number" {...register('age')} />
        {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
      </div>

      <div>
        <label>Роль</label>
        <select {...register('role')}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label>Пароль</label>
        <input type="password" {...register('password')} />
        {errors.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Повтор пароля</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && (
          <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label>О себе</label>
        <textarea {...register('bio')} rows={3} />
        {errors.bio && <p style={{ color: 'red' }}>{errors.bio.message}</p>}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
        {isSubmitting ? 'Отправка...' : 'Создать'}
      </button>
    </form>
  );
}

export default UserForm;