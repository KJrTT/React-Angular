import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; 
import { FavoritesService } from '../favorites';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-counter',
  templateUrl: './favorites-counter.html',
  // styleUrls: ['./favorites-counter.css']
})
export class FavoritesCounterComponent implements OnInit, OnDestroy {
  count: number = 0;
  private sub!: Subscription;

  // Внедряем ChangeDetectorRef
  constructor(private favorites: FavoritesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.favorites.favorites$.subscribe(() => {
      this.count = this.favorites.getCount();
      this.cdr.detectChanges(); // Принудительно обновляем UI
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}