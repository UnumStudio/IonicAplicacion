import { Injectable, computed, signal } from '@angular/core';
import { Usuario } from '../models/modelos';

const CLAVE_USUARIOS = 'vehiculo-app:usuarios';
const CLAVE_SESION = 'vehiculo-app:sesion';

export interface ResultadoAuth {
  ok: boolean;
  error?: string;
}

// Mock de autenticación: sin backend por ahora. Todo vive en localStorage
// para poder probar el flujo completo de registro/login/logout ya mismo.
// El día que conecten un backend real (o Firebase Auth), este servicio es
// el único archivo que hay que reemplazar — el resto de la app (guard,
// páginas) solo usa `usuarioActual()` y `estaAutenticado()`.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _usuarios = signal<Usuario[]>(this.cargarUsuarios());
  private readonly _usuarioActual = signal<Usuario | null>(this.cargarSesion());

  readonly usuarioActual = this._usuarioActual.asReadonly();
  readonly estaAutenticado = computed(() => this._usuarioActual() !== null);

  registrar(nombre: string, email: string, password: string): ResultadoAuth {
    const emailNormalizado = email.trim().toLowerCase();

    if (!nombre.trim() || !emailNormalizado || !password) {
      return { ok: false, error: 'Completá todos los campos.' };
    }

    if (this._usuarios().some((u) => u.email === emailNormalizado)) {
      return { ok: false, error: 'Ya existe una cuenta con ese email.' };
    }

    const nuevoUsuario: Usuario = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      email: emailNormalizado,
      password,
    };

    this._usuarios.update((lista) => [...lista, nuevoUsuario]);
    this.guardarUsuarios();
    this.iniciarSesionInterno(nuevoUsuario);

    return { ok: true };
  }

  iniciarSesion(email: string, password: string): ResultadoAuth {
    const emailNormalizado = email.trim().toLowerCase();
    const encontrado = this._usuarios().find(
      (u) => u.email === emailNormalizado && u.password === password
    );

    if (!encontrado) {
      return { ok: false, error: 'Email o contraseña incorrectos.' };
    }

    this.iniciarSesionInterno(encontrado);
    return { ok: true };
  }

  cerrarSesion(): void {
    this._usuarioActual.set(null);
    localStorage.removeItem(CLAVE_SESION);
  }

  private iniciarSesionInterno(usuario: Usuario): void {
    this._usuarioActual.set(usuario);
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
  }

  private guardarUsuarios(): void {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(this._usuarios()));
  }

  private cargarUsuarios(): Usuario[] {
    try {
      const guardado = localStorage.getItem(CLAVE_USUARIOS);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  }

  private cargarSesion(): Usuario | null {
    try {
      const guardado = localStorage.getItem(CLAVE_SESION);
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  }
}
