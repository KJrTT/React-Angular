import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesCounter } from './favorites-counter';

describe('FavoritesCounter', () => {
  let component: FavoritesCounter;
  let fixture: ComponentFixture<FavoritesCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
