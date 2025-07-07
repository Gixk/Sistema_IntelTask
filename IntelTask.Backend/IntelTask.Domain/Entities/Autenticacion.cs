using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Autenticacion
    {
        public int CN_Id_usuario { get; set; }
        public string? CT_Nombre_usuario { get; set; } = string.Empty;
        public string? CT_Correo_usuario { get; set; } = string.Empty;
        public int? CT_Rol { get; set; }
    }
}
