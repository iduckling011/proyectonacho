// 1. IMPORTACIONES: Aquí traemos todas las herramientas que necesitamos.
// Importamos módulos básicos de Angular, utilidades de formularios y el enrutador.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Importamos el controlador para mostrar mensajes flotantes (Toast) y todos los componentes visuales de Ionic.
import { ToastController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonIcon, IonSearchbar, IonList, IonItemSliding, IonItem, IonLabel,
  IonNote, IonBadge, IonItemOptions, IonItemOption, IonFab, IonFabButton,
  IonModal, IonInput, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/angular/standalone';

// Importamos la función para registrar iconos y los iconos específicos que usaremos.
import { addIcons } from 'ionicons';
import { globeOutline, documentTextOutline, trashOutline, addOutline, closeOutline, saveOutline, statsChartOutline, cogOutline } from 'ionicons/icons';

// 2. INTERFAZ: Define la estructura estricta o el "molde" que debe tener cada Nota.
export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

// 3. DECORADOR DEL COMPONENTE: Configura este archivo como una página de Angular Standalone.
// Aquí se enlazan el HTML y el SCSS, y se declaran todos los componentes que se van a usar en la vista.
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonButton, IonIcon, IonSearchbar, IonList,
    IonItemSliding, IonItem, IonLabel, IonNote, IonBadge, IonItemOptions,
    IonItemOption, IonFab, IonFabButton, IonModal, IonInput, IonSelect,
    IonSelectOption, IonTextarea
  ]
})
export class Tab1Page implements OnInit {
  
  // 4. VARIABLES GLOBALES DEL COMPONENTE (Estado de la app)
  notes: Note[] = []; // Arreglo principal que guarda todas las notas.
  filteredNotes: Note[] = []; // Arreglo secundario usado para mostrar las notas cuando se usa el buscador.
  isModalOpen = false; // Controla si la ventana flotante (modal) de crear/editar está abierta o cerrada.
  lang: 'es' | 'en' = 'es'; // Variable que guarda el idioma actual (inicia en español por defecto).

  // Variable temporal que guarda los datos de la nota que se está creando o editando en el formulario.
  currentNote: Partial<Note> = {
    title: '',
    content: '',
    category: 'Personal'
  };

  // 5. CONSTRUCTOR: Se ejecuta apenas se crea la página. 
  // Inyecta el ToastController y registra los iconos para que Ionic los pueda dibujar en pantalla.
  constructor(private toastCtrl: ToastController) {
    addIcons({
      globeOutline, documentTextOutline, trashOutline, addOutline,
      closeOutline, saveOutline, statsChartOutline, cogOutline
    });
  }

  // 6. CICLOS DE VIDA: Estas funciones se disparan automáticamente.
  // ngOnInit se ejecuta al iniciar el componente.
  ngOnInit() {
    this.loadNotes();
  }

  // ionViewWillEnter es exclusivo de Ionic y se ejecuta cada vez que la vista va a entrar a la pantalla (útil si regresas de otra pestaña).
  ionViewWillEnter() {
    this.loadNotes();
  }

  // 7. MÉTODO PARA CARGAR NOTAS: Intenta leer las notas guardadas en la memoria del celular/navegador.
  loadNotes() {
    const savedNotes = localStorage.getItem('quicknotes_data');
    if (savedNotes) {
      // Si hay notas guardadas, las convierte de texto (JSON) a un arreglo de objetos.
      this.notes = JSON.parse(savedNotes);
    } else {
      // Si no hay nada guardado (es la primera vez que se abre la app), crea una nota de bienvenida por defecto.
      // ¡AQUÍ ESTÁ TU MENSAJE! Puedes usar un ternario aquí si quieres: 
      // title: this.lang === 'es' ? 'Bienvenido' : 'Welcome',
      this.notes = [
        {
          id: 1,
          title: 'Bienvenido a QuickNotes',
          content: 'Esta es tu primera nota. Puedes crear, editar y eliminar notas fácilmente.',
          category: 'Personal',
          date: new Date().toISOString()
        }
      ];
      this.saveToStorage(); // Guarda esta nota inicial.
    }
    // Sincroniza la lista visual con la lista real.
    this.filteredNotes = [...this.notes];
  }

  // 8. MÉTODO PARA GUARDAR NOTAS: Convierte el arreglo de notas a texto (String) y lo guarda en LocalStorage.
  saveToStorage() {
    localStorage.setItem('quicknotes_data', JSON.stringify(this.notes));
  }

  // 9. MÉTODO DE BÚSQUEDA: Se activa cada vez que el usuario escribe en la barra de búsqueda.
  filterNotes(event: any) {
    const query = event?.detail?.value ? event.detail.value.toLowerCase() : '';
    // Si la barra está vacía, muestra todas las notas.
    if (!query.trim()) {
      this.filteredNotes = [...this.notes];
      return;
    }
    // Si hay texto, filtra las notas buscando coincidencias en el título o el contenido.
    this.filteredNotes = this.notes.filter(n =>
      n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
    );
  }

  // 10. CAMBIO DE IDIOMA: Alterna entre español e inglés y muestra una alerta (Toast).
  toggleLanguage() {
    this.lang = this.lang === 'es' ? 'en' : 'es';
    const msg = this.lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    this.showToast(msg, 'tertiary');
  }

  // 11. MÉTODOS DEL MODAL (Ventana flotante)
  // Prepara una nota en blanco y abre el modal para agregar una nueva.
  openAddModal() {
    this.currentNote = { title: '', content: '', category: 'Personal' };
    this.isModalOpen = true;
  }

  // Recibe la nota a la que se le dio clic, la copia en currentNote y abre el modal para editar.
  openEditModal(note: Note) {
    this.currentNote = { ...note };
    this.isModalOpen = true;
  }

  // Simplemente cierra el modal.
  closeModal() {
    this.isModalOpen = false;
  }

  // 12. MÉTODO PRINCIPAL PARA GUARDAR O EDITAR LA NOTA
  async saveNote() {
    // Valida que el título y el contenido no estén vacíos.
    if (!this.currentNote.title?.trim() || !this.currentNote.content?.trim()) {
      const errorMsg = this.lang === 'es' ? 'Por favor completa los campos obligatorios.' : 'Please fill in required fields.';
      await this.showToast(errorMsg, 'warning');
      return;
    }

    if (this.currentNote.id) {
      // SI LA NOTA YA TIENE ID (Modo Edición): Busca su posición y actualiza sus datos.
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
      // SI LA NOTA NO TIENE ID (Modo Creación): Crea un ID nuevo usando la fecha actual y la agrega al inicio de la lista.
      const newNote: Note = {
        id: Date.now(),
        title: this.currentNote.title || '',
        content: this.currentNote.content || '',
        category: this.currentNote.category || 'Personal',
        date: new Date().toISOString()
      };
      this.notes.unshift(newNote); // unshift la mete al principio del arreglo
      const msg = this.lang === 'es' ? 'Nota guardada correctamente' : 'Note saved successfully';
      await this.showToast(msg, 'success');
    }

    // Finalmente, guarda los cambios en memoria, actualiza la vista y cierra el modal.
    this.saveToStorage();
    this.filteredNotes = [...this.notes];
    this.closeModal();
  }

  // 13. MÉTODO PARA ELIMINAR NOTA: Filtra el arreglo quitando la nota que coincida con el ID recibido.
  async deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveToStorage();
    this.filteredNotes = [...this.notes];
    const msg = this.lang === 'es' ? 'Nota eliminada' : 'Note deleted';
    await this.showToast(msg, 'danger');
  }

  // 14. FUNCIÓN AUXILIAR PARA MENSAJES (TOAST): Crea y muestra la alerta en la parte inferior de la pantalla.
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