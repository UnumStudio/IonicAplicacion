import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cashOutline,
  carSportOutline,
  homeOutline,
  mapOutline,
  personCircleOutline,
} from 'ionicons/icons';

interface ItemNav {
  etiqueta: string;
  icono: string;
  ruta: string;
}

@Component({
  selector: 'app-barra-navegacion',
  imports: [RouterLink, RouterLinkActive, IonIcon],
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
})
export class BarraNavegacionComponent {
  // Los íconos de abajo tienen que estar registrados con addIcons() en el constructor
  items: ItemNav[] = [
    { etiqueta: 'Inicio', icono: 'home-outline', ruta: '/paginas/inicio' },
    { etiqueta: 'Gastos', icono: 'cash-outline', ruta: '/paginas/gastos' },
    { etiqueta: 'Mapa', icono: 'map-outline', ruta: '/paginas/mapa' },
    { etiqueta: 'Vehículos', icono: 'car-sport-outline', ruta: '/paginas/mis-vehiculos' },
    { etiqueta: 'Perfil', icono: 'person-circle-outline', ruta: '/paginas/perfil' },
  ];

  constructor() {
    addIcons({ homeOutline, cashOutline, mapOutline, carSportOutline, personCircleOutline });
  }
}
