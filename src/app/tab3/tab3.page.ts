import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  globeOutline,
  personCircleOutline,
  languageOutline,
  trashBinOutline,
  codeWorkingOutline,
  logoGithub
} from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel
  ]
})
export class Tab3Page {
  lang: 'es' | 'en' = 'es';

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({
      globeOutline,
      personCircleOutline,
      languageOutline,
      trashBinOutline,
      codeWorkingOutline,
      logoGithub
    });
  }

  async toggleLanguage() {
    this.lang = this.lang === 'es' ? 'en' : 'es';
    const msg = this.lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    await this.showToast(msg, 'tertiary');
  }

  async clearAllData() {
    const alert = await this.alertCtrl.create({
      header: this.lang === 'es' ? '¿Confirmar eliminación?' : 'Confirm deletion?',
      message: this.lang === 'es' ? 'Se borrarán todas las notas permanentemente.' : 'All notes will be deleted permanently.',
      buttons: [
        {
          text: this.lang === 'es' ? 'Cancelar' : 'Cancel',
          role: 'cancel'
        },
        {
          text: this.lang === 'es' ? 'Borrar todo' : 'Delete All',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem('quicknotes_data');
            this.showToast(
              this.lang === 'es' ? 'Todos los datos han sido borrados' : 'All data cleared',
              'danger'
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}