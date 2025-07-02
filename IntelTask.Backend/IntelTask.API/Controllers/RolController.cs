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
    public class RolController : Controller
    {
        private readonly Rol_IRepository _rolRepo;
        public RolController(Rol_IRepository interfaz) 
        {
            _rolRepo = interfaz;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            var items = await _rolRepo.GetAllRoles();
            return Ok(items);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleById(int id)
        {
           var rol = await _rolRepo.GetRoleById(id); // Check if rol is null
           return rol != null ? Ok(rol) : NotFound(); // OK returns 200, NotFound 404
        }




        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Rol rol)
        {
            await _rolRepo.AddRole(rol);

            // createdataction returns 201 Created
            return CreatedAtAction(nameof(GetRoleById), new { id = rol.CN_Id_rol }, rol);
        }




        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] Rol rol)
        {
            var infoRol = await _rolRepo.GetRoleById(id);
            if (infoRol == null) return NotFound();

            // Update fields acording to the provided Rol object
            if (rol.CT_Nombre_rol != infoRol.CT_Nombre_rol)
                infoRol.CT_Nombre_rol = rol.CT_Nombre_rol;

            if (rol.CN_Jerarquia != infoRol.CN_Jerarquia)
                infoRol.CN_Jerarquia = rol.CN_Jerarquia;

            await _rolRepo.UpdateRole(infoRol);
            return NoContent(); // Returns 204 No Content

        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
           var rolito = await _rolRepo.GetRoleById(id);

            if (rolito == null) return NotFound($"No se encontró el rol con ID {id}");

            await _rolRepo.DeleteRole(id);
            return Ok(new { mensaje = "Rol eliminado correctamente" });
        }

    }
}
