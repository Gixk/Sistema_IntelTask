using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Notificaciones
    {
        public int CN_Id_notificacion { get; set; }
        public int CN_Tipo_notificacion { get; set; }
        public string CT_Titulo_notificacion { get; set; } = string.Empty;
        public string CT_Texto_notificacion { get; set; } = string.Empty;
        public string CT_Correo_origen { get; set; } = string.Empty;
        public DateTime CF_Fecha_registro { get; set; } = DateTime.Now;
        public DateTime CF_Fecha_Notificacion { get; set; }
        public int CN_Id_recordatorio { get; set; }


        public Usuario? Usuario { get; set; }
    }
}
