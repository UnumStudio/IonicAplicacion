import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginas/inicio',
    pathMatch: 'full',
  },
  {
    path: 'paginas/inicio',
    loadComponent: () =>
      import('./paginas/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'paginas/gastos',
    loadComponent: () =>
      import('./paginas/gastos/gastos.page').then((m) => m.GastosPage),
  },
  {
    path: 'paginas/mapa',
    loadComponent: () =>
      import('./paginas/mapa/mapa.page').then((m) => m.MapaPage),
  },
  {
    path: 'paginas/vehiculo',
    loadComponent: () =>
      import('./paginas/vehiculo/vehiculo.page').then((m) => m.VehiculoPage),
  },

  // Estas 3 las habías generado con "ionic g page" pero se borraron al
  // limpiar la carpeta "paginas". Corré "ionic g page paginas/mis-vehiculos"
  // (etc.) de nuevo cuando quieras retomarlas, y descomentá su ruta acá:

  // {
  //   path: 'paginas/mis-vehiculos',
  //   loadComponent: () =>
  //     import('./paginas/mis-vehiculos/mis-vehiculos.page').then((m) => m.MisVehiculosPage),
  // },
  // {
  //   path: 'paginas/agregar-vehiculo',
  //   loadComponent: () =>
  //     import('./paginas/agregar-vehiculo/agregar-vehiculo.page').then((m) => m.AgregarVehiculoPage),
  // },
  // {
  //   path: 'paginas/notificaciones',
  //   loadComponent: () =>
  //     import('./paginas/notificaciones/notificaciones.page').then((m) => m.NotificacionesPage),
  // },
];
