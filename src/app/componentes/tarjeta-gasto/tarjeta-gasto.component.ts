import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { waterOutline, constructOutline, shieldCheckmarkOutline, buildOutline, pricetagOutline } from 'ionicons/icons';
import { Gasto, CategoriaGasto } from '../../models/modelos';

@Component({
  selector: 'app-tarjeta-gasto',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './tarjeta-gasto.component.html',
  styleUrls: ['./tarjeta-gasto.component.scss'],
})
export class TarjetaGastoComponent {
  @Input() gasto!: Gasto;

  private iconos: Record<CategoriaGasto, string> = {
    nafta: 'water-outline',
    reparaciones: 'construct-outline',
    seguro: 'shield-checkmark-outline',
    mantenimiento: 'build-outline',
    otro: 'pricetag-outline',
  };

  private colores: Record<CategoriaGasto, string> = {
    nafta: '#EDE9FE',
    reparaciones: '#FEF3C7',
    seguro: '#DBEAFE',
    mantenimiento: '#DCFCE7',
    otro: '#F3F4F6',
  };

  constructor() {
    addIcons({ waterOutline, constructOutline, shieldCheckmarkOutline, buildOutline, pricetagOutline });
  }

  get icono(): string {
    return this.iconos[this.gasto.categoria];
  }

  get colorFondo(): string {
    return this.colores[this.gasto.categoria];
  }

  get fechaFormateada(): string {
    const fecha = new Date(this.gasto.fecha);
    return fecha.toLocaleDateString('es-AR', { day: '2-digit', month: 'long' });
  }

  get montoFormateado(): string {
    return this.gasto.monto.toLocaleString('es-AR');
  }
}
