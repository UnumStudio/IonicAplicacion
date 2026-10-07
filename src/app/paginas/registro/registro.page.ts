import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IonContent, IonButton, IonInput, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { carSportOutline } from 'ionicons/icons';
import { AuthService } from '../../servicios/auth.service';

// Validador simple a nivel de formulario: confirma que "password" y
// "confirmarPassword" sean iguales.
function contraseniasIguales(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmar = control.get('confirmarPassword')?.value;
  return password && confirmar && password !== confirmar ? { noCoincide: true } : null;
}

@Component({
  selector: 'app-registro',
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
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formulario = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['', [Validators.required]],
    },
    { validators: contraseniasIguales }
  );

  errorRegistro = signal<string | null>(null);
  enviando = signal(false);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    addIcons({ carSportOutline });
  }

  registrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.errorRegistro.set(null);

    const { nombre, email, password } = this.formulario.getRawValue();
    const resultado = this.auth.registrar(nombre!, email!, password!);

    this.enviando.set(false);

    if (!resultado.ok) {
      this.errorRegistro.set(resultado.error ?? 'No se pudo crear la cuenta.');
      return;
    }

    this.router.navigateByUrl('/paginas/inicio');
  }
}
