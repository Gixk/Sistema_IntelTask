using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


// Define the funcionalities applying to the Usuario entity
namespace IntelTask.Domain.Interface
{
    public interface Usuario_IRepository
    {
        Task<Autenticacion> VerificarUsuario(string email, string password);

        Task<List<Usuario>> GetAllUsers();

        Task<List<Usuario?>> GetUsersActivos();

        Task<Usuario?> GetUserById(int id);

        Task AddUser(Usuario user);

        Task UpdateUser(Usuario user);

        Task ChangeUserStatus(int id);

        Task<int> GetJerarquiaUsuario(int id);

    }
}
