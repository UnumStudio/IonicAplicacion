import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AlertController,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline, trashOutline } from 'ionicons/icons';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { TipoCombustible } from '../../models/modelos';

// Convierte el valor de un input numérico opcional: vacío → undefined.
function numeroOpcional(valor: unknown): number | undefined {
  return valor === null || valor === undefined || valor === '' ? undefined : Number(valor);
}

// Esta página sirve tanto para CREAR como para EDITAR un vehículo:
// - /paginas/agregar-vehiculo            → crear uno nuevo
// - /paginas/agregar-vehiculo?id=xxxx    → editar el vehículo con ese id
// Así evitamos duplicar el formulario en dos componentes distintos.
@Component({
  selector: 'app-agregar-vehiculo',
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonButton,
    IonInput,
    IonIcon,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  readonly tiposCombustible: TipoCombustible[] = ['Nafta', 'Diesel', 'GNC', 'Híbrido', 'Eléctrico'];
  readonly tracciones = ['4x2', '4x4'];

  modoEdicion = signal(false);
  private idEditando: string | null = null;

  formulario = this.fb.group({
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    anio: [new Date().getFullYear(), [Validators.required, Validators.min(1950)]],
    patente: ['', [Validators.required, Validators.minLength(6)]],
    fotoUrl: ['assets/vehiculos/hilux.png', [Validators.required]],
    // Datos opcionales que se muestran en la tarjeta de "Mis vehículos"
    traccion: [''],
    combustible: [''],
    nivelCombustible: [null as number | null, [Validators.min(0), Validators.max(100)]],
    proximoServiceKm: [null as number | null, [Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private vehiculosService: VehiculosService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    addIcons({ closeOutline, trashOutline });
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

    const valores = this.formulario.getRawValue();

    const datos = {
      marca: valores.marca!,
      modelo: valores.modelo!,
      anio: Number(valores.anio),
      patente: valores.patente!,
      fotoUrl: valores.fotoUrl!,
      traccion: valores.traccion || undefined,
      combustible: (valores.combustible || undefined) as TipoCombustible | undefined,
      nivelCombustible: numeroOpcional(valores.nivelCombustible),
      proximoServiceKm: numeroOpcional(valores.proximoServiceKm),
    };

    if (this.modoEdicion() && this.idEditando) {
      this.vehiculosService.actualizarVehiculo(this.idEditando, datos);
    } else {
      this.vehiculosService.agregarVehiculo(datos);
    }

    this.router.navigateByUrl('/paginas/mis-vehiculos');
  }

  // Solo se muestra en modo edición. Pide confirmación antes de borrar.
  async eliminar(): Promise<void> {
    if (!this.idEditando) return;

    const alerta = await this.alertController.create({
      header: 'Eliminar vehículo',
      message: '¿Seguro que querés eliminar este vehículo? No se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.vehiculosService.eliminarVehiculo(this.idEditando!);
            this.router.navigateByUrl('/paginas/mis-vehiculos');
          },
        },
      ],
    });
    await alerta.present();
  }

  cancelar(): void {
    this.router.navigateByUrl('/paginas/mis-vehiculos');
  }
}
