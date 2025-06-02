import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'detalhe/:id',
    loadComponent: () =>
      import('./pages/detalhe/detalhe.page').then((m) => m.DetalhePage),
  },
];
