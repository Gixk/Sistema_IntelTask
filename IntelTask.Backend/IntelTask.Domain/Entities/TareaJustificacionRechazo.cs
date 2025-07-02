using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class TareaJustificacionRechazo
    {
        public int CN_Id_tarea_rechazo { get; set; }
        public int CN_Id_tarea { get; set; }
        public DateTime CF_Fecha_hora_rechazo { get; set; } = DateTime.Now;
        public string CT_Descripcion_rechazo { get; set; } = string.Empty;
    }
}
