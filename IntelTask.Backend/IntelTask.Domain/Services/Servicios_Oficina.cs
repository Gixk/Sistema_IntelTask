using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Services
{
    public class Servicios_Oficina
    {
        private readonly Oficina_IRepository _ofiRepo;

        public Servicios_Oficina(Oficina_IRepository repo)
        {
            _ofiRepo = repo;
        }

        public async Task<List<Oficina>> ObtenerTodasLasOficinas()
        {
            return await _ofiRepo.GetAllOffices();
        }



        public async Task<Oficina?> ObtenerOficinaPorId(int id)
        {
            return await _ofiRepo.GetOfficeById(id);
        }



        public async Task CrearOficina(Oficina oficina)
        {
            // Validar oficina encargada si se proporciona
            if (oficina.CN_Oficina_encargada.HasValue)
            {
                var encargada = await _ofiRepo.GetOfficeById(oficina.CN_Oficina_encargada.Value);
                if (encargada == null)
                    throw new Exception("La oficina encargada especificada no existe.");
            }
            await _ofiRepo.AddOffice(oficina);
        }




        public async Task<bool> ActualizarOficina(int id, Oficina oficinaNueva)
        {
            var oficinaExistente = await _ofiRepo.GetOfficeById(id);


            
            if (!string.IsNullOrWhiteSpace(oficinaNueva.CT_Nombre_oficina))
            {
                oficinaExistente.CT_Nombre_oficina = oficinaNueva.CT_Nombre_oficina;
            }


            if (oficinaNueva.CN_Oficina_encargada.HasValue)
            {
                var encargada = await _ofiRepo.GetOfficeById(oficinaNueva.CN_Oficina_encargada.Value);
                if (encargada == null)
                    throw new Exception("La oficina encargada especificada no existe.");

                oficinaExistente.CN_Oficina_encargada = oficinaNueva.CN_Oficina_encargada;
            }

            await _ofiRepo.UpdateOffice(oficinaExistente);
            return true;
        }



    }
}
