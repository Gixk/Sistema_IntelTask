using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface UserOffice_IRepo
    {
        Task<OficinaUsuarioDto> ObtenerOficinaUsuario(int id);

        Task AddUserToOffice(UserOffice val);

        Task UpdateUserOffice(UserOffice id);
    }
}
