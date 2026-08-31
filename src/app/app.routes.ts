import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'gastos',
    loadComponent: () => import('./paginas/gastos/gastos.page').then( m => m.GastosPage)
  },
  {
    path: 'mapa',
    loadComponent: () => import('./paginas/mapa/mapa.page').then( m => m.MapaPage)
  },
  {
    path: 'vehiculo',
    loadComponent: () => import('./paginas/vehiculo/vehiculo.page').then( m => m.VehiculoPage)
  },
];
