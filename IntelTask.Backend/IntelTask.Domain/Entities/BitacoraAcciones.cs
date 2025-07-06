using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class BitacoraAcciones
    {
        public int CN_Id_bitacora { get; set; }
        public DateTime? CF_Fecha_hora_registro { get; set; } = DateTime.Now;
        public int CN_Id_accion { get; set; } // 1: Creación, 2: Edición, 3: Eliminación, 4: Cambio de estado
        public int CN_Id_pantalla { get; set; }
        public int CN_id_usuario { get; set; } // Usuario que realizó la acción
        public string? CT_informacion_importante { get; set; } = string.Empty;
        public int CN_Id_tipo_documento { get; set; } // 1: Tarea, 2: Seguimiento, 3: Usuario, etc.
        public int CN_documento { get; set; }
    }
}
