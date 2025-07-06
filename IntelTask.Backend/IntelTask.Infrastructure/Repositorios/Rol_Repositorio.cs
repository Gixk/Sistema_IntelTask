using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;

// Aplica la logica del negocio para la entidad Rol
namespace IntelTask.Infrastructure.Repositorios
{

    public class Rol_Repositorio : Rol_IRepository
    {
        private readonly IntelTaskDbContext _context;


        public Rol_Repositorio(IntelTaskDbContext context) 
        {
            _context = context;
        }


        public async Task<List<Rol>> GetAllRoles()
        {
            return await _context.T_Roles.ToListAsync();
        }



        public async Task<Rol?> GetRoleById(int id)
        {
            return await _context.T_Roles.FindAsync(id);
        }



        public async Task AddRole(Rol rol)
        {
            await _context.T_Roles.AddAsync(rol);
            await _context.SaveChangesAsync();
        }



        public async Task UpdateRole(Rol rol)
        {
            _context.T_Roles.Update(rol);
            await _context.SaveChangesAsync();
        }



        public async Task DeleteRole(int id)
        {
            // Verifica existencia
            var rol = await _context.T_Roles.FindAsync(id);
            if (rol != null)
            {
                _context.T_Roles.Remove(rol);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<int> GetJerarquiaRol(int rol)
        {
            var rolEntity = await _context.T_Roles.FindAsync(rol);
            if (rolEntity != null)
            {
                return rolEntity.CN_Jerarquia;
            }
            throw new Exception("Rol no encontrado");
        }
    }
}
