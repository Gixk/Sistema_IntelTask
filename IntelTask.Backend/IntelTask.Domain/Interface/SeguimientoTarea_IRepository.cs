using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface SeguimientoTarea_IRepository
    {
        public Task<List<TareasSeguimiento>> GetHistorialTarea(int tareaId);
        public Task<TareasSeguimiento> AddSeguimiento(TareasSeguimiento datos);
    }
}
