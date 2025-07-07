import { Injectable } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../AuthService/auth';


@Injectable({
  providedIn: 'root'
})

export class ServicioTarea {
  private readonly urlAPI = 'https://localhost:5001/api';

  constructor(private http: HttpClient, private auth: Auth) { }



  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.urlAPI}/Tareas`);
  }


  //getTareasAsignadas(): Observable<Tarea[]>{}

  getTareasUsuario(id: number): void {
    // return this.tareas.find(t => t.idTarea === id);
  }


  getTareasCreador() { }


  getTareasIncumplidas() { }


  getIncumplidasUsuario() { }


  getTareasRevision() { }

  getTReviUsuario() { }


  cambiarEstadoTarea() {
    alert('SE CAMBIO EL ESTADO');
  }


  crearTarea(tarea: Tarea) {
    const idCreador = this.auth.obtenerDatosToken()?.rol;

    const payload = {
      cn_Id_tarea: tarea.idTarea,
      cn_Tarea_origen: tarea.idTareaOrigen,
      ct_Titulo_tarea: tarea.titulo,
      ct_Descripcion_tarea: tarea.descripcion,
      ct_Descripcion_espera: tarea.motivoEspera,
      cn_Id_complejidad: tarea.complejidad,
      cn_Id_estado: tarea.estado,
      cn_Id_prioridad: tarea.prioridad,
      cn_Numero_GIS: tarea.numGis,
      cf_Fecha_asignacion: tarea.fechaAsignacion,
      cf_Fecha_limite: tarea.fechaLimite,
      cf_Fecha_finalizacion: tarea.fechaFin || new Date(),
      cn_Usuario_creador: this.auth.obtenerDatosToken()?.identificador,
      cn_Usuario_asignado: tarea.asignado,
    };
    return this.http.post<Tarea>(`${this.urlAPI}/Tareas/${idCreador}`, payload);
  }


  actualizarTarea(tarea: Tarea) {

      const payload = {
    cn_Id_tarea: tarea.idTarea,
    cn_Tarea_origen: tarea.idTareaOrigen,
    ct_Titulo_tarea: tarea.titulo,
    ct_Descripcion_tarea: tarea.descripcion,
    ct_Descripcion_espera: tarea.motivoEspera,
    cn_Id_complejidad: tarea.complejidad,
    cn_Id_estado: tarea.estado,
    cn_Id_prioridad: tarea.prioridad,
    cn_Numero_GIS: tarea.numGis,
    cf_Fecha_asignacion: tarea.fechaAsignacion,
    cf_Fecha_limite: tarea.fechaLimite,
    cf_Fecha_finalizacion: tarea.fechaFin || new Date(),
    cn_Usuario_creador: tarea.creador,
    cn_Usuario_asignado: tarea.asignado
  };
    return this.http.patch<Tarea>(`${this.urlAPI}/Tareas/${tarea.idTarea}`, payload);
  }
}
