import { useState, useEffect } from 'react';

function Pagination() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [page]);

  return (
    <div>
      <h2>Посты</h2>
      
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Назад
      </button>
      <span> Страница {page} </span>
      <button onClick={() => setPage(page + 1)}>
        Вперёд
      </button>
    </div>
  );
}

export default Pagination;