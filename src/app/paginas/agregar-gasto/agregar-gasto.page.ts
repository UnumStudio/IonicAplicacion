import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { GastosService } from '../../servicios/gastos.service';
import { CategoriaGasto } from '../../models/modelos';

interface OpcionCategoria {
  etiqueta: string;
  valor: CategoriaGasto;
}

@Component({
  selector: 'app-agregar-gasto',
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
  templateUrl: './agregar-gasto.page.html',
  styleUrls: ['./agregar-gasto.page.scss'],
})
export class AgregarGastoPage {
  categorias: OpcionCategoria[] = [
    { etiqueta: 'Nafta', valor: 'nafta' },
    { etiqueta: 'Reparaciones', valor: 'reparaciones' },
    { etiqueta: 'Seguro', valor: 'seguro' },
    { etiqueta: 'Mantenimiento', valor: 'mantenimiento' },
    { etiqueta: 'Otro', valor: 'otro' },
  ];

  categoriaSeleccionada: CategoriaGasto = 'nafta';

  formulario = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    monto: [null as number | null, [Validators.required, Validators.min(1)]],
    fecha: [this.hoyISO(), [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private gastosService: GastosService,
    private router: Router
  ) {
    addIcons({ closeOutline });
  }

  seleccionarCategoria(valor: CategoriaGasto): void {
    this.categoriaSeleccionada = valor;
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { titulo, monto, fecha } = this.formulario.getRawValue();

    this.gastosService.agregarGasto({
      categoria: this.categoriaSeleccionada,
      titulo: titulo!,
      monto: monto!,
      fecha: fecha!,
    });

    this.router.navigateByUrl('/paginas/gastos');
  }

  cancelar(): void {
    this.router.navigateByUrl('/paginas/gastos');
  }

  private hoyISO(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
