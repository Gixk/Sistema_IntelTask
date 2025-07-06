using IntelTask.API.frontDTO;
using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;

/*
 El controlador está para esto:
 - Recibir una solicitud.
 - Llamar a un servicio de aplicación o de dominio.
 - Devolver un resultado.
 */

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Usuario_Controller : ControllerBase
    {

        private readonly Servicios_Usuario _service;
        private readonly Usuario_IRepository _userRepo;


        public Usuario_Controller(Usuario_IRepository iRepository, Servicios_Usuario service)
        {
            _userRepo = iRepository;
            _service = service; // initialize the service
        }



        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _userRepo.GetAllUsers();

            var listaDTO = items.Select(u => new UsuarioDTO
            {
                IdUsuario = u.CN_Id_usuario,
                NombreUsuario = u.CT_Nombre_usuario ?? "",
                Correo = u.CT_Correo_usuario ?? "",
                FechaNac = u.CF_Fecha_nacimiento,
                Contra = u.CT_Contrasenna ?? "",
                EstadoUsuario = u.CB_Estado_usuario,
                FechaCreacion = u.CF_Fecha_creacion_usuario,
                FechaModificacion = u.CF_Fecha_modificacion_usuario,
                RolUsuario = u.CN_Id_rol
            }).ToList();

            return Ok(listaDTO);
        }


        //
        [HttpGet("activos")]
        public async Task<IActionResult> GetActiveUsers()
        {
            var items = await _userRepo.GetUsersActivos();

            var listaDTO = items.Select(u => new UsuarioDTO
            {
                IdUsuario = u.CN_Id_usuario,
                NombreUsuario = u.CT_Nombre_usuario ?? "",
                Correo = u.CT_Correo_usuario ?? "",
                FechaNac = u.CF_Fecha_nacimiento,
                Contra = u.CT_Contrasenna ?? "",
                EstadoUsuario = u.CB_Estado_usuario,
                FechaCreacion = u.CF_Fecha_creacion_usuario,
                FechaModificacion = u.CF_Fecha_modificacion_usuario,
                RolUsuario = u.CN_Id_rol
            }).ToList();

            return Ok(listaDTO);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var u = await _userRepo.GetUserById(id);

            if (u == null) return NotFound();

            var dto = new UsuarioDTO
            {
                IdUsuario = u.CN_Id_usuario,
                NombreUsuario = u.CT_Nombre_usuario ?? "",
                Correo = u.CT_Correo_usuario ?? "",
                FechaNac = u.CF_Fecha_nacimiento,
                Contra = u.CT_Contrasenna ?? "",
                EstadoUsuario = u.CB_Estado_usuario,
                FechaCreacion = u.CF_Fecha_creacion_usuario,
                FechaModificacion = u.CF_Fecha_modificacion_usuario,
                RolUsuario = u.CN_Id_rol
            };

            return Ok(dto);
        }



        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Usuario user)
        {
            user.CF_Fecha_creacion_usuario = DateTime.Now;
            user.CF_Fecha_modificacion_usuario = DateTime.Now;
            user.CB_Estado_usuario = true;

            await _userRepo.AddUser(user);

            // createdataction devuelve un 201 Created
            return CreatedAtAction(nameof(GetById), new { id = user.CN_Id_usuario }, user);
        }




        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Usuario entidad)
        {
            // Busca el usuario existente por id, si no existe retorna NotFound
            var usuario = await _userRepo.GetUserById(id);
            if (usuario == null) return NotFound();


            // Actualiza los campos del usuario existente con los valores del objeto recibido
            if (entidad.CT_Nombre_usuario != null)
                usuario.CT_Nombre_usuario = entidad.CT_Nombre_usuario;

            if (entidad.CT_Correo_usuario != null)
                usuario.CT_Correo_usuario = entidad.CT_Correo_usuario;

            if (entidad.CF_Fecha_nacimiento != DateTime.MinValue)
                usuario.CF_Fecha_modificacion_usuario = DateTime.Now;

            if (entidad.CT_Contrasenna != entidad.CT_Contrasenna)
                usuario.CT_Contrasenna = entidad.CT_Contrasenna;

            if (entidad.CN_Id_rol != 0 && entidad.CN_Id_rol != usuario.CN_Id_rol)
                usuario.CN_Id_rol = entidad.CN_Id_rol;


            // Actualiza la fecha de actualizacion
            usuario.CF_Fecha_modificacion_usuario = DateTime.Now;

            await _userRepo.UpdateUser(usuario);
            return NoContent();
        }




        // Activa o desactiva un usuario según su ID
        [HttpPatch("estado/{id}")]
        public async Task<IActionResult> ChangeUserStatus(int id)
        {
            var usuario = await _userRepo.GetUserById(id);
            if (usuario == null)
                return NotFound($"No se encontró el usuario con ID {id}");

            await _userRepo.ChangeUserStatus(id);
            return Ok(new { mensaje = "Cambio aplicado correctamente", usuario.CN_Id_usuario, usuario.CB_Estado_usuario });
        }

    }
}
