import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonContent, IonIcon, IonButton } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  personCircleOutline,
  buildOutline,
  sparklesOutline,
  constructOutline,
  carOutline,
  warningOutline
} from 'ionicons/icons';

import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { Vehiculo } from '../../models/modelos';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonIcon,
    IonButton,
    BarraNavegacionComponent
  ],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  nombreUsuario = 'Usuario';

  vehiculo: Vehiculo = {
    id: '1',
    marca: 'Toyota',
    modelo: 'Hilux',
    anio: 2018,
    patente: 'AE123CD',
    fotoUrl: 'assets/vehiculos/hilux.png',
  };

  gastosDelMes = 154000;

  variacionMesAnterior = 12;

  barrasGastos = [
    0.4,
    0.55,
    0.5,
    0.35,
    1,
    0.6
  ];

  proximoMantenimiento = {
    titulo: 'Cambio de aceite',
    diasRestantes: 12,
  };

  constructor() {
    addIcons({
      personCircleOutline,
      buildOutline,
      sparklesOutline,
      constructOutline,
      carOutline,
      warningOutline
    });
  }

  get montoFormateado(): string {
    return this.gastosDelMes.toLocaleString('es-AR');
  }
}