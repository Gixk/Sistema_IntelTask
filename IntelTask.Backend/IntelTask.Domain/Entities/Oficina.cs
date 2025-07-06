using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class Oficina
    {
        public int CN_Codigo_oficina { get; set; }
        public string CT_Nombre_oficina { get; set; } = string.Empty;
        public int CN_Oficina_encargada { get; set; }

    }
}
