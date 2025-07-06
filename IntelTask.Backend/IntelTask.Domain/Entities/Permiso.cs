using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Permiso
    {
        public int CN_Id_permiso { get; set; }
        public string? CT_Titulo_permiso { get; set; } = string.Empty;
        public string? CT_Descripcion_permiso { get; set; } = string.Empty;
        public byte? CN_Id_estado { get; set; }
        public string? CT_Descripcion_rechazo { get; set; }
        public DateTime? CF_Fecha_hora_registro { get; set; } = DateTime.Now;
        public DateTime? CF_Fecha_hora_inicio_permiso { get; set; }
        public DateTime? CF_Fecha_hora_fin_permiso { get; set; }
        public int CN_Usuario_creador { get; set; }
    }
}
