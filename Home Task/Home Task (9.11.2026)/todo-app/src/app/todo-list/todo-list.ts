import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TodoService, Todo } from '../todo';
import { FavoritesService } from '../favorites';
import { FavoritesCounterComponent } from '../favorites-counter/favorites-counter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
  standalone: true,
  imports: [FavoritesCounterComponent, CommonModule]
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService, 
    public favorites: FavoritesService
  ) {
    this.todos = this.todoService.getTodos();
  }

  toggleFavorite(id: number): void {
    this.favorites.toggle(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.favorites.removeFavorite(id);
    this.todos = this.todoService.getTodos();
  }
}