import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notificacion } from '../../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class ServicioNotis {

  private readonly urlAPI = '';

  constructor(private http: HttpClient) { }

  getNotificaciones(): Observable<Notificacion[]> {
    //return this.http.get<Notificacion[]>(this.urlAPI);
    return of([
    {
      id: 1,
      tipo: 2,
      titulo: 'Tarea próxima a vencer',
      texto: 'Recuerda que tu tarea "Auditoría interna" vence mañana.',
      correoDestino: 'usuario@example.com',
      correoOrigen: 'encargado@gamil.com',
      fechaRegistro: new Date('2025-06-10T10:30:00'),
      fechaNotificacion: new Date('2025-06-10T10:30:00'),
      fechaEventoPospuesto: new Date('2025-06-13T11:00:00'),
      frecuenciaRecordatorio: 4,
    },
    {
      id: 10,
      tipo: 1,
      titulo: 'Reuniocnsdflsdf',
      texto: 'Recuerda que tu tarea "Auditoría interna" vence mañana.',
      correoDestino: 'usuario@example.com',
      correoOrigen: 'encargado@gamil.com',
      fechaRegistro: new Date('2025-06-11T02:30:00'),
      fechaNotificacion: new Date('2025-06-11T02:30:00'),
      fechaEventoPospuesto: new Date('2025-06-12T10:30:00'),
      frecuenciaRecordatorio: 4,
    },
    {
      id: 7,
      tipo: 4,
      titulo: 'Reuniocnsdflsdf',
      texto: 'Recuerda que tu tarea "Auditoría interna" vence mañana.',
      correoDestino: 'usuario@example.com',
      correoOrigen: 'encargado@gamil.com',
      fechaRegistro: new Date('2025-06-10T10:30:00'),
      fechaNotificacion: new Date('2025-06-10T10:30:00'),
      fechaEventoPospuesto: new Date('2025-06-10T10:30:00'),
      frecuenciaRecordatorio: 4,
    },
    ]);
  }
}
