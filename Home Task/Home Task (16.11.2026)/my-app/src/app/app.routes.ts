import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotesList } from './notes-list/notes-list';
import { NoteForm } from './note-form/note-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Главная' },
  { path: 'notes', component: NotesList, title: 'Заметки' },
  { path: 'create', component: NoteForm, title: 'Создать заметку' },
  { path: '**', redirectTo: '' }
];