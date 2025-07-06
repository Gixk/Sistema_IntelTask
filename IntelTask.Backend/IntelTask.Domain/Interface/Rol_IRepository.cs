using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface Rol_IRepository
    {
        Task<List<Rol>> GetAllRoles();
        Task<Rol?> GetRoleById(int id);
        Task AddRole(Rol rol);
        Task UpdateRole(Rol rol);
        Task DeleteRole(int id);

        Task<int> GetJerarquiaRol(int rol);
    }
}
