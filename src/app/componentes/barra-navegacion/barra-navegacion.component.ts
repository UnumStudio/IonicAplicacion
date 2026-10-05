import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, cashOutline, mapOutline, carSportOutline } from 'ionicons/icons';

interface ItemNav {
  etiqueta: string;
  icono: string;
  ruta: string;
}

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule, IonIcon],
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
})
export class BarraNavegacionComponent {
  items: ItemNav[] = [
    { etiqueta: 'Inicio', icono: 'home-outline', ruta: '/paginas/inicio' },
    { etiqueta: 'Gastos', icono: 'cash-outline', ruta: '/paginas/gastos' },
    { etiqueta: 'Mapa', icono: 'map-outline', ruta: '/paginas/mapa' },
    { etiqueta: 'Vehículo', icono: 'car-sport-outline', ruta: '/paginas/vehiculo' },
  ];

  constructor() {
    addIcons({ homeOutline, cashOutline, mapOutline, carSportOutline });
  }
}
