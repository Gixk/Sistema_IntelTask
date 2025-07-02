using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IntelTask.Domain.Interface;
using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace IntelTask.Infrastructure.Repositorios
{
    public class SeguimientoTarea_Repositorio : SeguimientoTarea_IRepository
    {
        private readonly IntelTaskDbContext _context;

        public SeguimientoTarea_Repositorio(IntelTaskDbContext context)
        {
            _context = context;
        }



        public async Task<List<TareasSeguimiento>> GetHistorialTarea(int tareaId)
        {
            return await _context.T_Tareas_Seguimiento
                .Where(ts => ts.CN_Id_tarea == tareaId)
                .ToListAsync();
        }



        public async Task<TareasSeguimiento> AddSeguimiento(TareasSeguimiento datos)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try 
            {
                await _context.T_Tareas_Seguimiento.AddAsync(datos);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return datos;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error al agregar seguimiento a la tarea: " + ex.Message);
            }
        }
    }
}
