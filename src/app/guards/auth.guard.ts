import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

// Guard funcional (el estilo recomendado desde Angular 14+, sin clases).
// Lo usamos en app.routes.ts para que nadie pueda entrar a /paginas/* sin
// haber iniciado sesión antes: lo manda directo a /paginas/login.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  router.navigateByUrl('/paginas/login');
  return false;
};
