using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OficinasController : Controller
    {
        private readonly Oficina_IRepository _ofiRepo;

        public OficinasController(Oficina_IRepository repo)
        {
            _ofiRepo = repo;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllOffices()
        {
            var oficinas = await _ofiRepo.GetAllOffices();
            if (oficinas == null || !oficinas.Any())
            {
                return NotFound("No offices found.");
            }

            return Ok(oficinas);
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetOfficeById(int id)
        {
            var oficina = await _ofiRepo.GetOfficeById(id);
            return oficina != null ? Ok(oficina) : NotFound();
        }



        [HttpPost]
        public async Task<IActionResult> CreateOffice([FromBody] Oficina office)
        {
            await _ofiRepo.AddOffice(office);
            return CreatedAtAction(nameof(GetOfficeById), new { id = office.CN_Codigo_oficina }, office);
        }



        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateOffice(int id, [FromBody] Oficina office)
        {
            var existingOffice = await _ofiRepo.GetOfficeById(id);
            if (existingOffice == null)
            {
                return NotFound();
            }

            if(office.CT_Nombre_oficina != null)
                existingOffice.CT_Nombre_oficina = office.CT_Nombre_oficina;
            if(office.CN_Oficina_encargada != 0)
                existingOffice.CN_Oficina_encargada = office.CN_Oficina_encargada;

            await _ofiRepo.UpdateOffice(office);
            return NoContent();
        }

    }
}
