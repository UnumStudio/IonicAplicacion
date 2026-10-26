import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { buildOutline, chevronForward, pencilOutline, waterOutline } from 'ionicons/icons';
import { Vehiculo } from '../../models/modelos';

// Por debajo de este porcentaje el tanque se marca en alerta.
const NIVEL_COMBUSTIBLE_BAJO = 20;

@Component({
  selector: 'app-tarjeta-vehiculo',
  imports: [IonIcon],
  templateUrl: './tarjeta-vehiculo.component.html',
  styleUrls: ['./tarjeta-vehiculo.component.scss'],
})
export class TarjetaVehiculoComponent {
  @Input({ required: true }) vehiculo!: Vehiculo;
  @Input() activo = false;

  // Se emite al tocar la tarjeta (para marcarlo como el vehículo activo)
  @Output() seleccionar = new EventEmitter<Vehiculo>();
  // Se emite al tocar la foto (para ver la información detallada)
  @Output() verDetalle = new EventEmitter<Vehiculo>();
  // Se emite al tocar la flecha de la derecha (para editar el vehículo)
  @Output() editar = new EventEmitter<Vehiculo>();

  constructor() {
    addIcons({ buildOutline, chevronForward, pencilOutline, waterOutline });
  }

  // "2018 · 4x4 · Diesel": solo junta los datos que el vehículo realmente tiene.
  get detalle(): string {
    const { anio, traccion, combustible } = this.vehiculo;
    return [anio, traccion, combustible].filter(Boolean).join(' · ');
  }

  // Porcentaje de combustible acotado entre 0 y 100 (null si no hay dato).
  get nivelCombustible(): number | null {
    const nivel = this.vehiculo.nivelCombustible;
    return nivel == null ? null : Math.min(100, Math.max(0, nivel));
  }

  get nivelCombustibleTexto(): string {
    const nivel = this.nivelCombustible;
    return nivel === null ? '—' : `${nivel}%`;
  }

  get combustibleBajo(): boolean {
    const nivel = this.nivelCombustible;
    return nivel !== null && nivel < NIVEL_COMBUSTIBLE_BAJO;
  }

  get proximoServiceFormateado(): string {
    const km = this.vehiculo.proximoServiceKm;
    return km == null ? '—' : `${km.toLocaleString('es-AR')} km`;
  }

  onSeleccionar(): void {
    this.seleccionar.emit(this.vehiculo);
  }

  onVerDetalle(event: Event): void {
    // Evita que el toque en la foto también seleccione la tarjeta.
    event.stopPropagation();
    this.verDetalle.emit(this.vehiculo);
  }

  onEditar(event: Event): void {
    // Evita que el toque en la flecha también seleccione la tarjeta.
    event.stopPropagation();
    this.editar.emit(this.vehiculo);
  }
}

