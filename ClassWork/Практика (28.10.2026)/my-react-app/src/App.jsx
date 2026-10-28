import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddPostForm from './components/AddPostForm';
import PostsList from './components/PostsList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
        <h1>Посты</h1>
        <AddPostForm />
        <PostsList />
      </div>
    </QueryClientProvider>
  );
}

export default App; 