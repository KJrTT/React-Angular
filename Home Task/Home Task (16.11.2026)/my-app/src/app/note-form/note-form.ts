import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../note';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.html'
})
export class NoteForm {
  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);

  successMessage = '';
  errorMessage = '';

  noteForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    text: ['', [Validators.required, Validators.minLength(5)]]
  });

  get title() { return this.noteForm.get('title'); }
  get text() { return this.noteForm.get('text'); }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.noteForm.valid) {
      const { title, text } = this.noteForm.value;
      this.noteService.addNote({ title: title!, text: text! }).subscribe({
        next: () => {
          this.noteForm.reset();
          this.successMessage = 'Заметка создана';
        },
        error: () => {
          this.errorMessage = 'Не удалось создать заметку';
        }
      });
    } else {
      this.noteForm.markAllAsTouched();
    }
  }
}