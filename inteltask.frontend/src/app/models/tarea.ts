export interface Tarea {
  idTarea: number;
  idTareaOrigen?: number | null;
  titulo: string;
  descripcion: string;
  motivoEspera?: string | 'Sin motivo de espera';
  complejidad: number;
  estado: number;
  prioridad: number;
  numGis: string;
  fechaAsignacion: Date;
  fechaLimite: Date;
  fechaFin?: Date | null;
  creador: number;
  asignado: number;
  nombreCreador?: string;
  nombreAsignado?: string;

  fechaIncumplimiento?: Date;
  justificacionIncumplimiento?: string;
}

