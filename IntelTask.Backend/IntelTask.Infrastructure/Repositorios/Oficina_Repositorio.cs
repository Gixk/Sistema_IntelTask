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

        public Oficina_Repositorio (IntelTaskDbContext context) 
        { 
            _context = context;
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
            var tracked = await _context.T_Oficinas.FindAsync(oficina.CN_Codigo_oficina);
            if (tracked == null)
            {
                throw new Exception("Oficina no encontrada para actualización.");
            }

            // Solo actualiza los campos necesarios
            if (!string.IsNullOrWhiteSpace(oficina.CT_Nombre_oficina))
                tracked.CT_Nombre_oficina = oficina.CT_Nombre_oficina;

            if (oficina.CN_Oficina_encargada.HasValue)
                tracked.CN_Oficina_encargada = oficina.CN_Oficina_encargada;

            await _context.SaveChangesAsync();
        }
    }
}
