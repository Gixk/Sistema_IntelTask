import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.obtenerToken(); // Sin token no hay sesión iniciada

    if (!token) {
      this.router.navigate(['']);
      return false;
    }

    const rolesPermitidos: number[] = route.data?.['roles'];
    const rolUsuario = this.authService.getRol();


    if(!rolesPermitidos || rolesPermitidos.length === 0) return true;  //si la ruta no tiene roles definidos, cualquiera puede entrar
    if(rolesPermitidos.includes(rolUsuario!)) return true; // Permite que entre el usuario si tiene el permiso

    this.router.navigate(['']); // si no se cumplieron las condiciones, lleva al login
    return false;

  }
}
