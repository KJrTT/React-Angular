import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService { // Обратите внимание: класс называется TodoService, даже если файл todo.ts
  private todos: Todo[] = [
    { id: 1, title: 'Выучить Angular' },
    { id: 2, title: 'Сделать домашку' },
    { id: 3, title: 'Пойти поспать' }
  ];

  getTodos(): Todo[] {
    return this.todos;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}