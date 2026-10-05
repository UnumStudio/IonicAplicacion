import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { TarjetaGastoComponent } from '../../componentes/tarjeta-gasto/tarjeta-gasto.component';
import { Gasto, CategoriaGasto } from '../../models/modelos';

interface FiltroGasto {
  etiqueta: string;
  valor: CategoriaGasto | 'todos';
}

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, RouterModule, IonContent, IonButton, IonIcon, BarraNavegacionComponent, TarjetaGastoComponent],
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage {
  filtros: FiltroGasto[] = [
    { etiqueta: 'Todos', valor: 'todos' },
    { etiqueta: 'Nafta', valor: 'nafta' },
    { etiqueta: 'Reparaciones', valor: 'reparaciones' },
    { etiqueta: 'Seguro', valor: 'seguro' },
    { etiqueta: 'Mantenimiento', valor: 'mantenimiento' },
  ];

  filtroActivo: CategoriaGasto | 'todos' = 'todos';

  gastos: Gasto[] = [
    { id: '1', categoria: 'nafta', titulo: 'Nafta', fecha: '2026-05-24', monto: 35000 },
    { id: '2', categoria: 'mantenimiento', titulo: 'Cambio de aceite', fecha: '2026-05-17', monto: 28000 },
    { id: '3', categoria: 'seguro', titulo: 'Cuota seguro', fecha: '2026-05-10', monto: 42000 },
    { id: '4', categoria: 'reparaciones', titulo: 'Cambio de pastillas de freno', fecha: '2026-04-28', monto: 49000 },
  ];

  constructor() {
    addIcons({ addOutline });
  }

  seleccionarFiltro(valor: CategoriaGasto | 'todos'): void {
    this.filtroActivo = valor;
  }

  get gastosFiltrados(): Gasto[] {
    if (this.filtroActivo === 'todos') {
      return this.gastos;
    }
    return this.gastos.filter((g) => g.categoria === this.filtroActivo);
  }
}
