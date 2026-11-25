import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Note, NoteService } from '../note';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.html'
})
export class NotesList implements OnInit {
  private noteService = inject(NoteService);
  private cdr = inject(ChangeDetectorRef); 

  notes: Note[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.errorMessage = 'Не удалось загрузить заметки';
        this.isLoading = false;
        this.cdr.detectChanges(); 
        console.error(err);
      }
    });
  }

  remove(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== id);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.errorMessage = 'Не удалось удалить заметку';
        this.cdr.detectChanges();
      }
    });
  }
}