using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface Oficina_IRepository
    {
        Task<Oficina> GetOfficeById(int id);
        Task <List<Oficina?>> GetAllOffices();
        Task AddOffice(Oficina oficina);
        Task UpdateOffice(Oficina oficina);
    }
}
