import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { VehiculosService } from '../../servicios/vehiculos.service';

// Esta página sirve tanto para CREAR como para EDITAR un vehículo:
// - /paginas/agregar-vehiculo            → crear uno nuevo
// - /paginas/agregar-vehiculo?id=xxxx    → editar el vehículo con ese id
// Así evitamos duplicar el formulario en dos componentes distintos.
@Component({
  selector: 'app-agregar-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IonContent,
    IonButton,
    IonInput,
    IonIcon,
  ],
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  modoEdicion = signal(false);
  private idEditando: string | null = null;

  formulario = this.fb.group({
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    anio: [new Date().getFullYear(), [Validators.required, Validators.min(1950)]],
    patente: ['', [Validators.required, Validators.minLength(6)]],
    fotoUrl: ['assets/vehiculos/hilux.png', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private vehiculosService: VehiculosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ closeOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (!id) return;

    const vehiculo = this.vehiculosService.obtenerPorId(id);
    if (!vehiculo) return;

    this.idEditando = id;
    this.modoEdicion.set(true);
    this.formulario.patchValue(vehiculo);
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();

    if (this.modoEdicion() && this.idEditando) {
      this.vehiculosService.actualizarVehiculo(this.idEditando, {
        marca: datos.marca!,
        modelo: datos.modelo!,
        anio: datos.anio!,
        patente: datos.patente!,
        fotoUrl: datos.fotoUrl!,
      });
    } else {
      this.vehiculosService.agregarVehiculo({
        marca: datos.marca!,
        modelo: datos.modelo!,
        anio: datos.anio!,
        patente: datos.patente!,
        fotoUrl: datos.fotoUrl!,
      });
    }

    this.router.navigateByUrl('/paginas/mis-vehiculos');
  }

  cancelar(): void {
    this.router.navigateByUrl('/paginas/mis-vehiculos');
  }
}
