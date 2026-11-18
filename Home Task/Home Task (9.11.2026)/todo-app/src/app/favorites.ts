import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from './todo';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSet = new Set<number>();
  
  // Subject для реактивного обновления счетчика
  private favoritesSubject = new BehaviorSubject<Set<number>>(new Set());
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private todoService: TodoService) {}

  toggle(id: number): void {
    if (this.favoritesSet.has(id)) {
      this.favoritesSet.delete(id);
    } else {
      this.favoritesSet.add(id);
    }
    this.favoritesSubject.next(new Set(this.favoritesSet));
  }

  isFavorite(id: number): boolean {
    return this.favoritesSet.has(id);
  }

  getCount(): number {
    return this.favoritesSet.size;
  }

  // Метод для удаления из избранного
  removeFavorite(id: number): void {
    if (this.favoritesSet.has(id)) {
      this.favoritesSet.delete(id);
      this.favoritesSubject.next(new Set(this.favoritesSet));
    }
  }
}