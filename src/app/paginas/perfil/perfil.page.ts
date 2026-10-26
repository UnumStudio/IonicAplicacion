import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { carOutline, logOutOutline, mailOutline, personOutline } from 'ionicons/icons';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { AuthService } from '../../servicios/auth.service';
import { VehiculosService } from '../../servicios/vehiculos.service';

// Muestra los datos de la persona que se registró / inició sesión.
// Todo sale de AuthService, que por ahora es un mock sin base de datos
// (ver auth.service.ts), así que acá no hay nada que conectar a un backend.
@Component({
  selector: 'app-perfil',
  imports: [IonContent, IonIcon, IonButton, BarraNavegacionComponent],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuario = this.auth.usuarioActual;

  cantidadVehiculos = computed(() => this.vehiculosService.vehiculos().length);

  // Iniciales para el avatar: "Kevin Betancur" → "KB"
  iniciales = computed(() => {
    const nombre = this.usuario()?.nombre ?? '';
    return nombre
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((palabra) => palabra[0].toUpperCase())
      .join('');
  });

  constructor(
    private auth: AuthService,
    private vehiculosService: VehiculosService,
    private router: Router
  ) {
    addIcons({ carOutline, logOutOutline, mailOutline, personOutline });
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/paginas/login');
  }
}
