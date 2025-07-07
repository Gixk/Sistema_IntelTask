import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../AuthService/auth';

@Injectable({
  providedIn: 'root'
})


export class ServicioUsuario {
  private readonly urlAPI = 'https://localhost:5001/api';

  constructor(private http: HttpClient, private auth: Auth) { }

  getUsuario() : Observable<Usuario> {
    const user = this.auth.obtenerDatosToken()?.identificador;
    return this.http.get<Usuario>(`${this.urlAPI}/Usuario_/${user}`);
  } 



  getLowUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlAPI}/Usuario_/activos`);
  }

}
