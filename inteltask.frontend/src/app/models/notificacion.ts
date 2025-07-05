export interface Notificacion {
  id: number;
  tipo: number; // Tipo de notificación
  titulo: string;                       // Título de la notificación
  texto: string;                        // Contenido del mensaje
  correoDestino: string;               // Correo del destinatario
  correoOrigen: string;               // Correo del remitente (opcional)
  fechaRegistro: Date;                 // Fecha y hora en que se creó
  fechaNotificacion: Date;            // Fecha y hora programada para enviar
  fechaEventoPospuesto: Date;        // Nueva fecha si el evento fue pospuesto
  frecuenciaRecordatorio?: number;    // Minutos antes del evento para recordar
}