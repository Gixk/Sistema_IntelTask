using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface DiaNoHabli_IRepository
    {
        Task<IEnumerable<DiasNoHabiles>> ObtenerDias();
    }
}
