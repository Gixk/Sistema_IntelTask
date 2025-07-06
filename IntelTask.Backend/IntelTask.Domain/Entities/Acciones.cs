using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Acciones
    {
        public int CN_Id_accion { get; set; }
        public string? CT_Descripcion_accion { get; set; } = string.Empty;
    }
}
