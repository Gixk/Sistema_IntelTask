using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Prioridades
    {
        public int CN_Id_prioridad { get; set; }
        public string CT_Nombre_prioridad { get; set; } = string.Empty;
        public string CT_Descripcion_prioridad { get; set; } = string.Empty;
    }
}
