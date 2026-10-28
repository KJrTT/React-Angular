import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, defaultPostValues } from '../schemas/postSchema';

function PostForm({ initialData, onSubmit, isEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
    setError,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: initialData || defaultPostValues,
  });

  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  async function handleFormSubmit(data) {
    try {
      await onSubmit(data);
    } catch (err) {
      if (err.field) {
        setError(err.field, { message: err.message });
      } else {
        setError('root', { message: err.message || 'Что-то пошло не так' });
      }
    }
  }

  const isButtonDisabled = !isValid || isSubmitting || (isEdit && !isDirty);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div>
        <label>Заголовок</label>
        <input {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Текст поста</label>
        <textarea {...register('body')} rows={4} />
        {errors.body && <p>{errors.body.message}</p>}
      </div>

      <div>
        <label>ID автора</label>
        <input type="number" {...register('userId')} />
        {errors.userId && <p>{errors.userId.message}</p>}
      </div>

      <div>
        <label>Статус</label>
        <select {...register('status')}>
          <option value="draft">Черновик</option>
          <option value="published">Опубликовано</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <div>
        <label>Дата публикации</label>
        <input type="date" {...register('publishDate')} />
        {errors.publishDate && <p>{errors.publishDate.message}</p>}
      </div>

      <div>
        <label>Теги</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`tags.${index}`)}
              placeholder="Название тега"
            />
            <button type="button" onClick={() => remove(index)}>
              Удалить
            </button>
          </div>
        ))}
        {errors.tags?.root && <p>{errors.tags.root.message}</p>}
        {errors.tags?.map((err, i) =>
          err?.message ? (
            <p key={i}>
              Тег {i + 1}: {err.message}
            </p>
          ) : null
        )}
        <button type="button" onClick={() => append('')}>
          + Добавить тег
        </button>
      </div>

      {errors.root && <p>{errors.root.message}</p>}

      <button type="submit" disabled={isButtonDisabled}>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
}

export default PostForm;