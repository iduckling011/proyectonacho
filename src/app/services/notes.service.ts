import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private storageKey = 'quicknotes_data';

  constructor() {}

  // Obtener todas las notas de LocalStorage
  getNotes(): Note[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      const initialNotes: Note[] = [
        {
          id: 1,
          title: 'Bienvenido a QuickNotes',
          content: 'Esta es tu primera nota. Puedes crear, editar y eliminar notas fácilmente.',
          category: 'Personal',
          date: new Date().toISOString()
        }
      ];
      this.saveToStorage(initialNotes);
      return initialNotes;
    }
    return JSON.parse(data);
  }

  // Guardar una nueva nota
  addNote(note: Omit<Note, 'id' | 'date'>): Note {
    const notes = this.getNotes();
    const newNote: Note = {
      ...note,
      id: Date.now(),
      date: new Date().toISOString()
    };
    notes.unshift(newNote);
    this.saveToStorage(notes);
    return newNote;
  }

  // Actualizar una nota existente
  updateNote(updatedNote: Note): void {
    let notes = this.getNotes();
    const index = notes.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = { ...updatedNote, date: new Date().toISOString() };
      this.saveToStorage(notes);
    }
  }

  // Eliminar nota por ID
  deleteNote(id: number): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    this.saveToStorage(notes);
  }

  // Guardar en LocalStorage
  private saveToStorage(notes: Note[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }
}