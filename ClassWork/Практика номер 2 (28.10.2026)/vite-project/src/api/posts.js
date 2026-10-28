const BASE = 'https://jsonplaceholder.typicode.com';

export async function getPosts() {
  const res = await fetch(`${BASE}/posts?_limit=10`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getPost(id) {
    const res = await fetch(`${BASE}/posts/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data || Object.keys(data).length === 0) {
      throw new Error(`HTTP ${res.status}`);
    }
    return data;
  }


export async function createPost(data) {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updatePost({ id, data }) {
    const res = await fetch(`${BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  export async function deletePost(id) {
    const res = await fetch(`${BASE}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  }