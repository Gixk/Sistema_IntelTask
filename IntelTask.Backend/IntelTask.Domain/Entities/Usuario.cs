using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace IntelTask.Domain.Entities
{
    public class Usuario
    {
        public int CN_Id_usuario { get; set; }
        public string? CT_Nombre_usuario { get; set; } = string.Empty;
        public string? CT_Correo_usuario { get; set; } = string.Empty;
        public DateTime? CF_Fecha_nacimiento { get; set; }
        public string? CT_Contrasenna { get; set; } = string.Empty;
        public bool CB_Estado_usuario { get; set; }
        public DateTime? CF_Fecha_creacion_usuario { get; set; }
        public DateTime? CF_Fecha_modificacion_usuario { get; set; }
        public int CN_Id_rol { get; set; }

    }
}
