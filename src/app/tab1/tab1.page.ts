import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, documentTextOutline, trashOutline, addOutline, closeOutline, saveOutline, statsChartOutline, cogOutline } from 'ionicons/icons';

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonNote,
    IonBadge,
    IonItemOptions,
    IonItemOption,
    IonFab,
    IonFabButton,
    IonModal,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea
  ]
})
export class Tab1Page implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  isModalOpen = false;
  lang: 'es' | 'en' = 'es';

  currentNote: Partial<Note> = {
    title: '',
    content: '',
    category: 'Personal'
  };

  constructor(private toastCtrl: ToastController) {
    addIcons({
      globeOutline,
      documentTextOutline,
      trashOutline,
      addOutline,
      closeOutline,
      saveOutline,
      statsChartOutline,
      cogOutline
    });
  }

  ngOnInit() {
    this.loadNotes();
  }

  ionViewWillEnter() {
    this.loadNotes();
  }

  loadNotes() {
    const savedNotes = localStorage.getItem('quicknotes_data');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    } else {
      this.notes = [
        {
          id: 1,
          title: 'Bienvenido a QuickNotes',
          content: 'Esta es tu primera nota. Puedes crear, editar y eliminar notas fácilmente.',
          category: 'Personal',
          date: new Date().toISOString()
        }
      ];
      this.saveToStorage();
    }
    this.filteredNotes = [...this.notes];
  }

  saveToStorage() {
    localStorage.setItem('quicknotes_data', JSON.stringify(this.notes));
  }

  filterNotes(event: any) {
    const query = event?.detail?.value ? event.detail.value.toLowerCase() : '';
    if (!query.trim()) {
      this.filteredNotes = [...this.notes];
      return;
    }
    this.filteredNotes = this.notes.filter(n =>
      n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
    );
  }

  toggleLanguage() {
    this.lang = this.lang === 'es' ? 'en' : 'es';
    const msg = this.lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    this.showToast(msg, 'tertiary');
  }

  openAddModal() {
    this.currentNote = { title: '', content: '', category: 'Personal' };
    this.isModalOpen = true;
  }

  openEditModal(note: Note) {
    this.currentNote = { ...note };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async saveNote() {
    if (!this.currentNote.title?.trim() || !this.currentNote.content?.trim()) {
      const errorMsg = this.lang === 'es' ? 'Por favor completa los campos obligatorios.' : 'Please fill in required fields.';
      await this.showToast(errorMsg, 'warning');
      return;
    }

    if (this.currentNote.id) {
      const index = this.notes.findIndex(n => n.id === this.currentNote.id);
      if (index !== -1) {
        this.notes[index] = {
          ...this.notes[index],
          title: this.currentNote.title || '',
          content: this.currentNote.content || '',
          category: this.currentNote.category || 'Personal',
          date: new Date().toISOString()
        };
      }
      const msg = this.lang === 'es' ? 'Nota actualizada correctamente' : 'Note updated successfully';
      await this.showToast(msg, 'success');
    } else {
      const newNote: Note = {
        id: Date.now(),
        title: this.currentNote.title || '',
        content: this.currentNote.content || '',
        category: this.currentNote.category || 'Personal',
        date: new Date().toISOString()
      };
      this.notes.unshift(newNote);
      const msg = this.lang === 'es' ? 'Nota guardada correctamente' : 'Note saved successfully';
      await this.showToast(msg, 'success');
    }

    this.saveToStorage();
    this.filteredNotes = [...this.notes];
    this.closeModal();
  }

  async deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveToStorage();
    this.filteredNotes = [...this.notes];
    const msg = this.lang === 'es' ? 'Nota eliminada' : 'Note deleted';
    await this.showToast(msg, 'danger');
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}