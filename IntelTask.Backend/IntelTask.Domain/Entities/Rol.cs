using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Rol
    {
        public int CN_Id_rol { get; set; }
        public string CT_Nombre_rol { get; set; } = string.Empty;
        public int CN_Jerarquia { get; set; }
    }
}
