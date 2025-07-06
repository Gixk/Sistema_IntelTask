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
    public class DiaNoHabil_Repositorio : DiaNoHabli_IRepository
    {
        private readonly IntelTaskDbContext _context;

        public DiaNoHabil_Repositorio(IntelTaskDbContext context)
        {
            _context = context;
        }



        public async Task<IEnumerable<DiasNoHabiles>> ObtenerDias()
        {
            return await _context.NoHabiles.Where(d => d.CB_Activo == true)
                                           .OrderBy(d => d.CF_Fecha_inicio)
                                           .ToListAsync();
        }
    }
}
