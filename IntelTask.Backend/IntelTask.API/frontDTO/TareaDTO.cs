namespace IntelTask.API.frontDTO
{
    public class TareaDTO
    {
        public int IdTarea { get; set; }
        public int? IdTareaOrigen { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string MotivoEspera { get; set; } = "Sin motivo de espera";
        public byte Complejidad { get; set; }
        public byte Estado { get; set; }
        public byte Prioridad { get; set; }
        public string NumGis { get; set; } = string.Empty;
        public DateTime FechaAsignacion { get; set; }
        public DateTime FechaLimite { get; set; }
        public DateTime? FechaFin { get; set; }
        public int Creador { get; set; }
        public int? Asignado { get; set; }
        public string? NombreCreador { get; set; }
        public string? NombreAsignado { get; set; }
    }
}
