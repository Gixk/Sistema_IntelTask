using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Services
{
    public class Servicios_Usuario
    {
        private readonly Usuario_IRepository _userRepo;

        public Servicios_Usuario(Usuario_IRepository userRepo)
        {
            _userRepo = userRepo;
        }


        public bool VerificarFecha(DateTime fecha)
        {
           return true;
        }


        public bool PuedeAsignarTarea(int jerarquiaAsignador, int jerarquiaAsignado) 
        {
            return true;
        }


    }
}
