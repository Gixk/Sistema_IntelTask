export interface Tarea {
  idTarea: number;
  idTareaOrigen?: number | null;
  titulo: string;
  Descripcion: string;
  MotivoEspera?: string | null;
  complejidad: number;
  estado: number;
  prioridad: number;
  numGis: string;
  fechaAsignacion: Date;
  fechaLimite: Date;
  fechaFin?: Date | null;
  creador: string;
  idAsignado: number;
  nombreAsignado: string;
  selected?: boolean;
}

