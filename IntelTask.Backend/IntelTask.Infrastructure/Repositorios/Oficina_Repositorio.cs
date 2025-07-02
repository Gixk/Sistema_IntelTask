using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Infrastructure.Repositorios
{
    public class Oficina_Repositorio : Oficina_IRepository
    {
        private readonly IntelTaskDbContext _context;
        private readonly UserOffice_IRepo _userOfficeRepo; 

        public Oficina_Repositorio (IntelTaskDbContext context, UserOffice_IRepo repo) 
        { 
            _context = context;
            _userOfficeRepo = repo;
        }


        //Get a specific office
        public async Task<Oficina>? GetOfficeById(int id)
        {
            return await _context.T_Oficinas.FindAsync(id);
        }



        // Get all the info of the offices
        public async Task<List<Oficina>> GetAllOffices()
        {
            return await _context.T_Oficinas.ToListAsync(); 
        }



        public async Task AddOffice(Oficina oficina)
        {
            _context.T_Oficinas.Add(oficina);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateOffice(Oficina oficina)
        {
            _context.T_Oficinas.Update(oficina);
            await _context.SaveChangesAsync();
        }
    }
}
