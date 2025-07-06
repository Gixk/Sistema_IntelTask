

using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Infrastructure.Context;

namespace IntelTask.Infrastructure.Repositorios
{
    public class UserOffice_Repo : UserOffice_IRepo
    {
        private readonly IntelTaskDbContext _context;
        public UserOffice_Repo(IntelTaskDbContext context)
        {
            _context = context;
        }



        public Task AddUserToOffice(UserOffice val)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserOffice(UserOffice id)
        {
            throw new NotImplementedException();
        }
    }
}