import { Routes } from '@angular/router';
import * as path from 'node:path';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@baf/ui/layout').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@baf/ui/layout').then((m) => m.HeaderComponent),
        outlet: 'header',
      },
      {
        path: '',
        loadComponent: () => import('@baf/ui/layout').then((m) => m.FooterComponent),
        outlet: 'footer',
      },
    ],
  },
];
