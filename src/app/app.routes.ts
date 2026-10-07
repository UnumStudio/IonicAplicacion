import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginas/inicio',
    pathMatch: 'full',
  },

  // --- Rutas públicas (sin login) ---
  {
    path: 'paginas/login',
    loadComponent: () =>
      import('./paginas/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'paginas/registro',
    loadComponent: () =>
      import('./paginas/registro/registro.page').then((m) => m.RegistroPage),
  },

  // --- Rutas protegidas (necesitan haber iniciado sesión) ---
  {
    path: 'paginas/inicio',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'paginas/gastos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/gastos/gastos.page').then((m) => m.GastosPage),
  },
  {
    path: 'paginas/agregar-gasto',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/agregar-gasto/agregar-gasto.page').then(
        (m) => m.AgregarGastoPage
      ),
  },
  {
    path: 'paginas/mapa',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/mapa/mapa.page').then((m) => m.MapaPage),
  },
  {
    path: 'paginas/vehiculo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/vehiculo/vehiculo.page').then((m) => m.VehiculoPage),
  },
  {
    path: 'paginas/mis-vehiculos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/mis-vehiculos/mis-vehiculos.page').then(
        (m) => m.MisVehiculosPage
      ),
  },
  {
    // Crear y editar son la misma página; para editar se navega con
    // ?id=xxxx como query param (ver mis-vehiculos.page.ts)
    path: 'paginas/agregar-vehiculo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./paginas/agregar-vehiculo/agregar-vehiculo.page').then(
        (m) => m.AgregarVehiculoPage
      ),
  },

  // Pendiente: regenerar con "ionic g page paginas/notificaciones" y
  // descomentar acá cuando la retomen.
  // {
  //   path: 'paginas/notificaciones',
  //   canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./paginas/notificaciones/notificaciones.page').then((m) => m.NotificacionesPage),
  // },
];
