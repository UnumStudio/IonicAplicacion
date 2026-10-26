import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { TarjetaGastoComponent } from '../../componentes/tarjeta-gasto/tarjeta-gasto.component';
import { GastosService } from '../../servicios/gastos.service';
import { Gasto, CategoriaGasto } from '../../models/modelos';

interface FiltroGasto {
  etiqueta: string;
  valor: CategoriaGasto | 'todos';
}

@Component({
  selector: 'app-gastos',
  imports: [RouterLink, IonContent, IonButton, IonIcon, BarraNavegacionComponent, TarjetaGastoComponent],
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

  // Signal del servicio: ya viene ordenado del más reciente al más viejo
  // y se actualiza solo cuando se agrega un gasto.
  private gastos = this.gastosService.gastos;

  constructor(private gastosService: GastosService) {
    addIcons({ addOutline });
  }

  seleccionarFiltro(valor: CategoriaGasto | 'todos'): void {
    this.filtroActivo = valor;
  }

  get gastosFiltrados(): Gasto[] {
    if (this.filtroActivo === 'todos') {
      return this.gastos();
    }
    return this.gastos().filter((g) => g.categoria === this.filtroActivo);
  }
}
