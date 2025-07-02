using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Notificacion_Usuario
    {
        public int CN_Id_notificacion { get; set; }
        public int CN_Id_usuario { get; set; }
        public string CT_Correo_destino { get; set; } = string.Empty;
    }
}
