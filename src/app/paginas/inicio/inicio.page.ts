import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  buildOutline,
  sparklesOutline,
  constructOutline,
  carOutline,
  warningOutline,
} from 'ionicons/icons';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { AuthService } from '../../servicios/auth.service';
import { VehiculosService } from '../../servicios/vehiculos.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, IonContent, IonIcon, IonButton, BarraNavegacionComponent],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  // Vehículo que la persona marcó como activo en "Mis vehículos"
  vehiculo = this.vehiculosService.vehiculoActivo;

  // Solo el primer nombre: "Kevin Betancur" → "Kevin"
  nombreUsuario = computed(
    () => this.auth.usuarioActual()?.nombre.split(' ')[0] ?? 'Usuario'
  );

  // Los datos de abajo son de ejemplo: todavía no se calculan a partir de
  // los gastos reales (GastosService.totalDelMes ya está listo para eso).
  gastosDelMes = 154000;
  variacionMesAnterior = 12;
  barrasGastos = [0.4, 0.55, 0.5, 0.35, 1, 0.6];

  proximoMantenimiento = {
    titulo: 'Cambio de aceite',
    diasRestantes: 12,
  };

  constructor(
    private auth: AuthService,
    private vehiculosService: VehiculosService
  ) {
    addIcons({
      buildOutline,
      sparklesOutline,
      constructOutline,
      carOutline,
      warningOutline,
    });
  }

  get montoFormateado(): string {
    return this.gastosDelMes.toLocaleString('es-AR');
  }
}
