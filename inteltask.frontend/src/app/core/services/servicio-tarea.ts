import { Injectable } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ServicioTarea {
  private readonly urlAPI = 'https://localhost:5001/api';

  private tareas: Tarea[] = [
    {
      idTarea: 1,
      idTareaOrigen: null,
      titulo: "Actualizar base de datos",
      descripcion: "Actualizar la base con la nueva info de usuarios.",
      motivoEspera: "Tarea completada y validada por QA.",
      complejidad: 2,
      estado: 1,
      prioridad: 5,
      numGis: "GIS2025-001",
      fechaAsignacion: new Date("2025-06-01"),
      fechaLimite: new Date("2025-10-10"),
      fechaFin: new Date("2025-12-10"),
      creador: 125,
      asignado: 201,
      nombreCreador: "Creador tarea 1",
      nombreAsignado: "Luis Ramirez Artavia"
    },
    {
      idTarea: 6,
      idTareaOrigen: null,
      titulo: "Probar nuevas notificaciones",
      descripcion: "Validar el sistema push en staging.",
      motivoEspera: "",
      complejidad: 2,
      estado: 3,
      prioridad: 3,
      numGis: "GIS2025-006",
      fechaAsignacion: new Date("2025-06-07"),
      fechaLimite: new Date("2025-06-14"),
      fechaFin: new Date("2025-12-10"),
      creador: 125,
      asignado: 202,
      nombreCreador: "creador tarea 2",
      nombreAsignado: "Pedro"
    }];

  constructor(private http: HttpClient) { }


  
  getTareas(): Observable<Tarea[]> {
     return this.http.get<Tarea[]>(`${this.urlAPI}/Tareas`);
  }


  //getTareasAsignadas(): Observable<Tarea[]>{}

  getTareasUsuario(id: number): Tarea | undefined {
    return this.tareas.find(t => t.idTarea === id);
  }


  getTareasCreador(){}


  getTareasIncumplidas(){}


  getIncumplidasUsuario(){}


  getTareasRevision(){}

  getTReviUsuario(){}


  cambiarEstadoTarea() {
    alert('SE CAMBIO EL ESTADO');
  }


  crearTarea(tarea: Tarea) {
    alert('Tarea Creada');
    //return this.http.post<Tarea>(`${this.urlAPI}`, tare);
    return of(tarea);
  }

  actualizarTarea(tarea: Tarea)/* : Observable<Tarea>  */{
    alert('Tarea actualizada');
    return of(tarea);
   //return this.http.patch<Tarea>(`${this.urlAPI}/${tarea.idTarea}`, tarea);
  }
}
