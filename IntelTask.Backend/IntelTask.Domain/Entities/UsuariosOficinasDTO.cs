using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Entities
{
    public class UsuariosOficinasDTO
    {
        public int idUser { get; set; }
        public string nombreUser { get; set; }
        public String correo { get; set; }
        public int rolUser { get; set; }
    }
}
