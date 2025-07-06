using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Tareas
    {
        public int CN_Id_tarea { get; set; }
        public int? CN_Tarea_origen { get; set; }
        public string? CT_Titulo_tarea { get; set; } = string.Empty;
        public string CT_Descripcion_tarea { get; set; } = string.Empty;
        public string? CT_Descripcion_espera { get; set; } = "No hay motivo de espera";
        public byte CN_Id_complejidad { get; set; }
        public byte CN_Id_estado { get; set; } = 0;
        public byte CN_Id_prioridad { get; set; }
        public string? CN_Numero_GIS { get; set; } = string.Empty;
        public DateTime CF_Fecha_asignacion { get; set; } = DateTime.Now;
        public DateTime CF_Fecha_limite { get; set; }
        public DateTime CF_Fecha_finalizacion { get; set; }
        public int CN_Usuario_creador { get; set; }
        public int? CN_Usuario_asignado { get; set; }

    }
}
