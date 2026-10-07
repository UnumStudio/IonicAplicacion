import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { TarjetaVehiculoComponent } from '../../componentes/tarjeta-vehiculo/tarjeta-vehiculo.component';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Vehiculo } from '../../models/modelos';

@Component({
  selector: 'app-mis-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonButton,
    IonIcon,
    BarraNavegacionComponent,
    TarjetaVehiculoComponent,
  ],
  templateUrl: './mis-vehiculos.page.html',
  styleUrls: ['./mis-vehiculos.page.scss'],
})
export class MisVehiculosPage {
  // Son signals del servicio: el template se actualiza solo cuando
  // cambian, sin necesidad de refrescar nada a mano.
  vehiculos = this.vehiculosService.vehiculos;
  vehiculoActivo = this.vehiculosService.vehiculoActivo;

  constructor(
    private vehiculosService: VehiculosService,
    private router: Router
  ) {
    addIcons({ addOutline });
  }

  seleccionarActivo(vehiculo: Vehiculo): void {
    this.vehiculosService.seleccionarActivo(vehiculo.id);
  }

  editarVehiculo(vehiculo: Vehiculo): void {
    this.router.navigate(['/paginas/agregar-vehiculo'], {
      queryParams: { id: vehiculo.id },
    });
  }
}
