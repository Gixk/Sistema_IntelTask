import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ServicioUsuario {
  private readonly urlAPI = '';

  constructor(private http: HttpClient) { }

  getUsuario() : Observable<Usuario> {
    // Cuando tengas backend, descomenta esta línea:
    //return this.http.get<Usuario>(`${this.urlAPI}/1`);

    
    return of({
      idUsuario: 1483945,
      nombreUsuario: 'Marco Antonio Solis',
      correo: 'jperez@example.com',
      fechaNac: new Date('2000-06-10T10:30:00'),
      contra: 'string',
      estadoUsuario: true,
      fechaCreacion: new Date('2025-06-10T11:30:00'),
      fechaModificacion: new Date('2025-06-10T10:30:00'),
      rolUsuario: 3
    });
  } 

}
