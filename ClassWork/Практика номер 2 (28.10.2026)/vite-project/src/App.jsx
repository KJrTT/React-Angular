import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
      </Routes>
    </div>
  );
}

export default App;