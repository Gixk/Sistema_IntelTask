using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class BitacoraCambiosEstado
    {
        public int CN_Id_cambio_estado { get; set; }
        public int CN_Id_entidad_afectada { get; set; }
        public string CN_Tipo_entidad { get; set; } = string.Empty;
        public int CN_Id_estado_anterior { get; set; }
        public int CN_Id_estado_nuevo { get; set; }
        public DateTime CF_Fecha_hora_cambio { get; set; } = DateTime.Now;
        public int CN_Id_usuario_responsable { get; set; }
        public string CT_Observaciones { get; set; } = string.Empty;

    }
}
