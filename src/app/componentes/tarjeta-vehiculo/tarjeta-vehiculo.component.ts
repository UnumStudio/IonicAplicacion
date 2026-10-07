import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, checkmarkCircleOutline, pencilOutline } from 'ionicons/icons';
import { Vehiculo } from '../../models/modelos';

@Component({
  selector: 'app-tarjeta-vehiculo',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  templateUrl: './tarjeta-vehiculo.component.html',
  styleUrls: ['./tarjeta-vehiculo.component.scss'],
})
export class TarjetaVehiculoComponent {
  @Input() vehiculo!: Vehiculo;
  @Input() activo = false;

  // Se emite al tocar la tarjeta (para marcarlo como el vehículo activo)
  @Output() seleccionar = new EventEmitter<Vehiculo>();
  // Se emite al tocar el botón de editar
  @Output() editar = new EventEmitter<Vehiculo>();

  constructor() {
    addIcons({ checkmarkCircle, checkmarkCircleOutline, pencilOutline });
  }

  onSeleccionar(): void {
    this.seleccionar.emit(this.vehiculo);
  }

  onEditar(event: Event): void {
    event.stopPropagation();
    this.editar.emit(this.vehiculo);
  }
}
