import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


interface TokenData {
  usuario: string;
  nombre: string;
  rol: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private urlAPI = 'https://localhost:5001/api';

  /* Verifica existencia del usuario */
  autenticar(user: string, password: string) {
    return this.http.post(`${this.urlAPI}/Auth/login`, { 
      CT_Correo_usuario: user,
      CT_Contrasenna: password
     });
  }


  /* & Almacena en localstorage el token */
  guardarToken(token: string): void{
    localStorage.setItem('token', token);
  }



  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }



  obtenerDatosToken(): TokenData | null {
    const tokenito = this.obtenerToken();
    return tokenito ? jwtDecode<TokenData>(tokenito) : null;
  }


  getRol(): number | null {
    return this.obtenerDatosToken()?.rol ?? null;
  }


  // Array de roles con permisos sobre otros
  tienePermiso(roles: number[]): boolean {
    const rol = this.getRol();
    return roles.includes(rol!);
  }


  /* & Verifica que el usuario está autenticado - token activo */
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }



  /* & Cierra Sesión */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
