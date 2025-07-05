import { Injectable } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ServicioTarea {
  private readonly urlAPI = 'https';

  private tareas: Tarea[] = [
    {
      idTarea: 1,
      idTareaOrigen: null,
      titulo: "Actualizar base de datos",
      Descripcion: "Actualizar la base con la nueva info de usuarios.",
      MotivoEspera: "Tarea completada y validada por QA.",
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
      idTarea: 2,
      idTareaOrigen: null,
      titulo: "Revisar seguridad del sistema",
      Descripcion: "Verificar logs de acceso y alertas recientes.",
      MotivoEspera: "En espera de confirmación del equipo de red.",
      complejidad: 3,
      estado: 3,
      prioridad: 2,
      numGis: "GIS2025-002",
      fechaAsignacion: new Date("2025-06-03"),
      fechaLimite: new Date("2025-06-12"),
      fechaFin: new Date("2025-12-10"),
      creador: 125,
      asignado: 202,
      nombreCreador: "creador tarea 2",
      nombreAsignado: "Ana"
    },
    {
      idTarea: 3,
      idTareaOrigen: null,
      titulo: "Diseñar landing page",
      Descripcion: "Maquetar nueva landing para campaña de julio.",
      MotivoEspera: "",
      complejidad: 4,
      estado: 2,
      prioridad: 2,
      numGis: "GIS2025-003",
      fechaAsignacion: new Date("2025-06-02"),
      fechaLimite: new Date("2025-06-15"),
      fechaFin: new Date("2025-12-10"),
      creador: 128,
      asignado: 203,
      nombreCreador: "creador tarea 3",
      nombreAsignado: "Carlos"
    },
    {
      idTarea: 4,
      idTareaOrigen: null,
      titulo: "Documentar endpoints API",
      Descripcion: "Agregar ejemplos a la doc de autenticación.",
      MotivoEspera: "",
      complejidad: 1,
      estado: 1,
      prioridad: 3,
      numGis: "GIS2025-004",
      fechaAsignacion: new Date("2025-06-05"),
      fechaLimite: new Date("2025-08-18"),
      fechaFin: new Date("2025-12-10"),
      creador: 128,
      asignado: 204,
      nombreCreador: "creador tarea 3",
      nombreAsignado: "Sofía"
    },
    {
      idTarea: 5,
      idTareaOrigen: null,
      titulo: "Optimizar consulta SQL",
      Descripcion: "Revisar la query de reportes lentos.",
      MotivoEspera: "Esperando análisis de carga de base.",
      complejidad: 5,
      estado: 4,
      prioridad: 1,
      numGis: "GIS2025-005",
      fechaAsignacion: new Date("2025-06-06"),
      fechaLimite: new Date("2025-07-30"),
      fechaFin: new Date("2025-12-10"),
      creador: 125,
      asignado: 205,
      nombreCreador: "creador tarea 5",
      nombreAsignado: "María"
    },
    {
      idTarea: 6,
      idTareaOrigen: null,
      titulo: "Probar nuevas notificaciones",
      Descripcion: "Validar el sistema push en staging.",
      MotivoEspera: "",
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
    },
    {
      idTarea: 7,
      idTareaOrigen: null,
      titulo: "Actualizar manual del usuario",
      Descripcion: "Incluir secciones de funcionalidades nuevas.",
      MotivoEspera: "Faltan capturas de pantalla finales.",
      complejidad: 2,
      estado: 5,
      prioridad: 2,
      numGis: "GIS2025-007",
      fechaAsignacion: new Date("2025-08-04"),
      fechaLimite: new Date("2025-06-17"),
      fechaFin: null,
      creador: 125,
      asignado: 202,
      nombreCreador: "creador tarea 2",
      nombreAsignado: "Elena"
    }];

  constructor(private http: HttpClient) { }

  getTareas(): Tarea[] {
    return this.tareas;
  }

  getTareaPorId(id: number): Tarea | undefined {
    return this.tareas.find(t => t.idTarea === id);
  }

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
