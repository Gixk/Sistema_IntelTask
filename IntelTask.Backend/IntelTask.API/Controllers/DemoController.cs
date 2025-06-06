using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IntelTask.Domain.Entities;
using IntelTask.Infrastructure.Context;
using IntelTask.Domain.Interface;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemoController : ControllerBase
    {
        private readonly IDemo _demoRepository;

        public DemoController(IDemo demoRepository)
        {
            _demoRepository = demoRepository;
        }

        // GET: Obtiene todos los datos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _demoRepository.GetAllAsync();
            return Ok(items);
        }


        // GET: Obtiene datos de un id especifico
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _demoRepository.GetByIdAsync(id);
            return item != null ? Ok(item) : NotFound();
        }


        // POST: Agrega un registro
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EDemo entidad)
        {
            if (entidad == null) return BadRequest("Demo cannot be null.");

            await _demoRepository.AddAsync(entidad);
            return CreatedAtAction(nameof(GetById), new { id = entidad.TN_Codigo }, entidad);
        }




        // PUT: Actualizar
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EDemo entidad)
        {
            if (id != entidad.TN_Codigo) return BadRequest("Id vacio");

            var existingItem = await _demoRepository.GetByIdAsync(id); // Verifica existencia

            await _demoRepository.UpdateAsync(entidad);
            return NoContent();
        }



        // DELETE: Eliminar
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingItem = await _demoRepository.GetByIdAsync(id);

            if (existingItem == null) return NotFound("Demo not found.");

            await _demoRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
