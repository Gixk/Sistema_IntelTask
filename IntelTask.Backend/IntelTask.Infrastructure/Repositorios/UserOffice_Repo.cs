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
    public class UserOffice_Repo : UserOffice_IRepo
    {
        private readonly IntelTaskDbContext _context;
        private readonly Oficina_IRepository _OfiRepo;
        public UserOffice_Repo(IntelTaskDbContext context, Oficina_IRepository ui) { 
            _context = context;
            _OfiRepo = ui;
        }

        public async Task<OficinaUsuarioDto> ObtenerOficinaUsuario(int idOfi)
        {
            var data = await _OfiRepo.GetOfficeById(idOfi);

            var resultado = new OficinaUsuarioDto
            {
                Codigo = data.CN_Codigo_oficina,
                Oficina = data.CT_Nombre_oficina,
                Encargada = data.CN_Oficina_encargada
            };

            return resultado;
        }



        // Obtener todos los usuarios y las oficinas


        //Obtener los usuarios de una sola oficina



        public async Task AddUserToOffice(UserOffice val)
        {
            _context.TI_Usuario_X_Oficina.Add(val);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateUserOffice(UserOffice val)
        {
            _context.TI_Usuario_X_Oficina.Update(val);
            await _context.SaveChangesAsync();
        }
    }
}