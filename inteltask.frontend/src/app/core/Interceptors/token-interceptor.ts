import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../AuthService/auth';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const auth = inject(Auth); /* Inyección del servicio de autenticación */
  const token = auth.obtenerToken(); 

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout(); // Redirige al login si no está autenticado
      }
      return throwError(() => error);
    })
  );
};
