const BASE = 'https://jsonplaceholder.typicode.com';

export interface ApiTask {
  userId: number;
  id: number;
  title: string;
  body: string;
  completed?: boolean;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

export function getTasks(): Promise<ApiTask[]> {
  return request<ApiTask[]>('/todos?_limit=20');
}

export function getTask(id: string): Promise<ApiTask> {
  return request<ApiTask>(`/todos/${id}`);
}

export function createTask(data: Omit<ApiTask, 'id'>): Promise<ApiTask> {
  return request<ApiTask>('/todos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function deleteTask(id: number): Promise<void> {
  return request<void>(`/todos/${id}`, { method: 'DELETE' });
}