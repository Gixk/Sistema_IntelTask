using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace IntelTask.Infrastructure.Repositorios
{
    public class DemoRepositorio : IDemo
    {
        private readonly IntelTaskDbContext _context;

        public DemoRepositorio(IntelTaskDbContext context) { _context = context; }


        // Obtiene todos los datos
        public async Task<IEnumerable<EDemo>> GetAllAsync()
        {
            return await _context.T_Demo.ToListAsync();
        }


        // Obtiene datos de un id especifico
        public async Task<EDemo?> GetByIdAsync(int id)
        {
            return await _context.T_Demo.FindAsync(id);
        }


        // Agrega un registro
        public async Task AddAsync(EDemo demo)
        {
            await _context.T_Demo.AddAsync(demo);
            await _context.SaveChangesAsync();
        }


        //Actualizar
        public async Task UpdateAsync(EDemo demo)
        {
            _context.T_Demo.Update(demo);
            await _context.SaveChangesAsync();
        }


        //Eliminar
        public async Task DeleteAsync(int id)
        {
            //Verifica existencia
            var entidad = await _context.T_Demo.FindAsync(id);

            if (entidad != null) { 
                _context.T_Demo.Remove(entidad);
                await _context.SaveChangesAsync();
            }
         
        }
    }

}
