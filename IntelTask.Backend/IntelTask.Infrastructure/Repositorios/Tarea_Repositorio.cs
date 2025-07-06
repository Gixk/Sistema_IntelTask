using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using IntelTask.Domain.Interface;
using IntelTask.Domain.Entities;
using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace IntelTask.Infrastructure.Repositorios
{
    public class Tarea_Repositorio : Tareas_IRepository
    {
        private readonly IntelTaskDbContext _context;
        public Tarea_Repositorio(IntelTaskDbContext context)
        {
            _context = context;
        }


        public async Task<Tareas> CreateTarea(Tareas tarea)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                await _context.T_Tareas.AddAsync(tarea);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return tarea;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error al crear la tarea: " + ex.Message);
            }
        }



        public async Task<bool> UpdateTarea(Tareas tarea)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                _context.T_Tareas.Update(tarea);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error al actualizar la tarea: " + ex.Message);
            }
            return false;
        }



        public async Task ChangeStateTarea(int id, int estado)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            var tarea = await _context.T_Tareas.FindAsync(id); // Asegúrate de usar FindAsync correctamente
            if (tarea == null)
            {
                throw new Exception($"No se encontró la tarea con ID {id}");
            }

            tarea.CN_Id_estado = (byte)estado;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }




        // verify the existene of a task
        public async Task<bool> existeTarea(int id)
        {
            return await _context.T_Tareas.AnyAsync(t => t.CN_Id_tarea == id);
        }



        public async Task<List<Tareas>> GetAllTareas()
        {
            return await _context.T_Tareas.ToListAsync();
        }



        public async Task<Tareas> GetTareaById(int id)
        {
            return await _context.T_Tareas.FindAsync(id);
        }



        public async Task<List<Tareas>> GetTareasDeUsuario(int idUsuario)
        {
            return await _context.T_Tareas
                .Where(t => t.CN_Usuario_asignado == idUsuario || t.CN_Usuario_creador == idUsuario)
                .ToListAsync();

        }


        public async Task<List<Tareas>> GetTareasPorOrigen(int idOrigen)
        {
            // Valida que al menos una tarea tenga como origen ese id
            var tareas = await _context.T_Tareas
                .Where(t => t.CN_Tarea_origen == idOrigen)
                .ToListAsync();

            if (tareas == null || !tareas.Any())
            {
                throw new Exception($"No se encontraron tareas con asociada a: {idOrigen}");
            }

            return tareas;
        }


    }
}
