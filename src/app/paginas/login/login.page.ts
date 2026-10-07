import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { carSportOutline } from 'ionicons/icons';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  errorLogin = signal<string | null>(null);
  enviando = signal(false);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    addIcons({ carSportOutline });
  }

  iniciarSesion(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.errorLogin.set(null);

    const { email, password } = this.formulario.getRawValue();
    const resultado = this.auth.iniciarSesion(email!, password!);

    this.enviando.set(false);

    if (!resultado.ok) {
      this.errorLogin.set(resultado.error ?? 'No se pudo iniciar sesión.');
      return;
    }

    this.router.navigateByUrl('/paginas/inicio');
  }
}
