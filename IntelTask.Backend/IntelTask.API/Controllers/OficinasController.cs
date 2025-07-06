using IntelTask.API.frontDTO;
using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OficinasController : Controller
    {
        private readonly Servicios_Oficina _ofiService;

        public OficinasController(Servicios_Oficina serviciosOfi)
        {
            _ofiService = serviciosOfi;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllOffices()
        {
            var oficinas = await _ofiService.ObtenerTodasLasOficinas();

            var dtoList = oficinas.Select(o => new OficinaDTO
            {
                CodigoOficina = o.CN_Codigo_oficina,
                NombreOficina = o.CT_Nombre_oficina ?? "",
                CodOficinaEncargada = o.CN_Oficina_encargada
            }).ToList();

            return Ok(dtoList);
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetOfficeById(int id)
        {
            var o = await _ofiService.ObtenerOficinaPorId(id);

            if (o == null) return NotFound();

            var dto = new OficinaDTO
            {
                CodigoOficina = o.CN_Codigo_oficina,
                NombreOficina = o.CT_Nombre_oficina ?? "",
                CodOficinaEncargada = o.CN_Oficina_encargada
            };

            return Ok(dto);
        }



        [HttpPost]
        public async Task<IActionResult> CreateOffice([FromBody] Oficina office)
        {
            try
            {
                if (office == null)
                {
                    return BadRequest(new { mensaje = "Datos inválidos" });
                }

                await _ofiService.CrearOficina(office);
                return CreatedAtAction(nameof(GetOfficeById), new { id = office.CN_Codigo_oficina }, office);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }



        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateOffice(int id, [FromBody] Oficina office)
        {
            try
            {
                var ok = await _ofiService.ActualizarOficina(id, office);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

    }
}
