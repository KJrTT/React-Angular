import UserForm from './components/UserForm';
import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostsList';

function App() {
  async function handleUserSubmit(data) {
    console.log('Валидные данные пользователя:', data);
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <h1>Часть 11: Форма создания пользователя</h1>
      <UserForm onSubmit={handleUserSubmit} />

      <hr style={{ margin: '40px 0' }} />

      <h1>Часть 12: Посты</h1>
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;