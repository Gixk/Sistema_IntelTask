using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace IntelTask.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly Tareas_IRepository _tareaRepo;
        private readonly Servicios_Tarea _servTareas;


        public TareasController(Tareas_IRepository tareaRepo, Servicios_Tarea service)
        {
            _tareaRepo = tareaRepo;
            _servTareas = service; // initialize the service
        }


        [HttpGet] // Obtiene todas las tareas registradas
        public async Task<IActionResult> GetAll()
        {
            var items = await _tareaRepo.GetAllTareas();
            return Ok(items);
        }



        // Tareas relacionadas entre sí
        [HttpGet("hiloTareas/{idOrigen}")]
        public async Task<IActionResult> GetTareasPorOrigen(int idOrigen)
        {
            try
            {
                var tareas = await _tareaRepo.GetTareasPorOrigen(idOrigen);
                return Ok(tareas);
            }
            catch (Exception ex)
            {
                return NotFound(new { mensaje = ex.Message });
            }
        }




        // obtener una tarea especifica
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _tareaRepo.GetTareaById(id);
                return Ok(item);
            }
            catch (Exception ex)
            {
                return NotFound(new { mensaje = ex.Message });
            }
        }


        [HttpPatch("estado/{id}/{estado}")]
        public async Task<IActionResult> UpdateEstado(int id, int estado)
        {
            var existe = await _tareaRepo.existeTarea(id);
            if (!existe)
            {
                return NotFound($"Tarea con ID {id} no encontrada.");
            }

            await _tareaRepo.ChangeStateTarea(id, estado);
            // guardar en bitácora acciones y seguimiento
            // guardar en bitacora de cambios de estado

            return Ok(new { mensaje = "Estado actualizado correctamente", id, estado });
        }




        [HttpPost("{id}")]
        public async Task<IActionResult> CrearTarea([FromBody] Tareas nuevaTarea, [FromQuery] int idCreadorTarea)
        {
            try
            {
                var tareaCreada = await _servTareas.CrearTarea(nuevaTarea, idCreadorTarea);

                return CreatedAtAction(nameof(GetById), new { id = tareaCreada.CN_Id_tarea }, tareaCreada);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }




        [HttpPatch("{id}")]
        public async Task<IActionResult> EditarTarea(int id, [FromBody] Tareas nuevaInfo)
        {
            try
            {
                var resultado = await _servTareas.EditarTareaConValidaciones(id, nuevaInfo);
                // guardar en bitácora acciones y seguimiento

                return Ok(new { mensaje = "Tarea actualizada correctamente", resultado.CN_Id_tarea });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
    }
}
