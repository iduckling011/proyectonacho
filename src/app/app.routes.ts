import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./tab1/tab1.page').then((m) => m.Tab1Page),
  },
  {
    path: 'stats',
    loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page),
  },
  {
    path: 'settings',
    loadComponent: () => import('./tab3/tab3.page').then((m) => m.Tab3Page),
  },
];