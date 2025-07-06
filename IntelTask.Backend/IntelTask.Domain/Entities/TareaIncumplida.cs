using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class TareaIncumplida
    {
        public int CN_Id_tarea_incumplimiento { get; set; }
        public int CN_Id_tarea { get; set; }
        public string? CT_Justificacion_incumplimiento { get; set; } = string.Empty;
        public DateTime? CF_Fecha_incumplimiento { get; set; } = DateTime.Now;
    }
}
