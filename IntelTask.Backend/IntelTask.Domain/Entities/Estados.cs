using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Estados
    {
        public int CN_Id_estado { get; set; }
        public string CN_Nombre_estado { get; set; } = string.Empty;
        public string CN_Descripcion_estado { get; set; } = string.Empty;
    }
}
