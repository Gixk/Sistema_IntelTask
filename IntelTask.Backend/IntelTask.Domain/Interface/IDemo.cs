using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface IDemo
    {
        Task<IEnumerable<EDemo>> GetAllAsync();

        Task<EDemo?> GetByIdAsync(int id);

        Task AddAsync(EDemo demo);

        Task UpdateAsync(EDemo demo);

        Task DeleteAsync(int id);
    }
}
