import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'juros-simples',
    loadComponent: () => import('./pages/juros-simples/juros-simples.page').then( m => m.JurosSimplesPage)
  },
  {
    path: 'juros-compostos',
    loadComponent: () => import('./pages/juros-compostos/juros-compostos.page').then( m => m.JurosCompostosPage)
  },
  {
    path: 'aposentadoria',
    loadComponent: () => import('./pages/aposentadoria/aposentadoria.page').then( m => m.AposentadoriaPage)
  },
  {
    path: 'financiamento',
    loadComponent: () => import('./pages/financiamento/financiamento.page').then( m => m.FinanciamentoPage)
  },
];
