import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { globeOutline, documentTextOutline, folderOpenOutline, pricetagOutline } from 'ionicons/icons';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface CategoryStat {
  name: string;
  count: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonBadge
  ]
})
export class Tab2Page {
  totalNotes = 0;
  categories: string[] = ['Personal', 'Trabajo', 'Estudios'];
  categoryStats: CategoryStat[] = [];
  lang: 'es' | 'en' = 'es';

  constructor(private toastCtrl: ToastController) {
    addIcons({
      globeOutline,
      documentTextOutline,
      folderOpenOutline,
      pricetagOutline
    });
  }

  ionViewWillEnter() {
    this.calculateStats();
  }

  calculateStats() {
    const savedNotes = localStorage.getItem('quicknotes_data');
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];

    this.totalNotes = notes.length;

    this.categoryStats = this.categories.map(cat => {
      const count = notes.filter(n => n.category === cat).length;
      return { name: cat, count };
    });
  }

  async toggleLanguage() {
    this.lang = this.lang === 'es' ? 'en' : 'es';
    const msg = this.lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'tertiary',
      position: 'bottom'
    });
    await toast.present();
  }
}