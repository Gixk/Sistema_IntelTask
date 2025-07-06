import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ServicioUsuario {
  private readonly urlAPI = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getUsuario() : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlAPI}/Usuario_/12`);
  } 



  getLowUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlAPI}/Usuario_/activos`);
  }

}
