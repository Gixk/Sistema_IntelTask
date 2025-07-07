using IntelTask.API.frontDTO;
using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

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

            var listaDTO = items.Select(t => new TareaDTO
            {
                IdTarea = t.CN_Id_tarea,
                IdTareaOrigen = t.CN_Tarea_origen,
                Titulo = t.CT_Titulo_tarea ?? "",
                Descripcion = t.CT_Descripcion_tarea ?? "",
                MotivoEspera = t.CT_Descripcion_espera ?? "Sin motivo de espera",
                Complejidad = t.CN_Id_complejidad,
                Estado = t.CN_Id_estado,
                Prioridad = t.CN_Id_prioridad,
                NumGis = t.CN_Numero_GIS ?? "",
                FechaAsignacion = t.CF_Fecha_asignacion,
                FechaLimite = t.CF_Fecha_limite,
                FechaFin = t.CF_Fecha_finalizacion,
                Creador = t.CN_Usuario_creador,
                Asignado = t.CN_Usuario_asignado,
                // Opcional: NombreCreador y NombreAsignado si tienes acceso a ellos
            }).ToList();

            return Ok(listaDTO);
        }



        // Tareas relacionadas entre sí
        [HttpGet("hiloTareas/{idOrigen}")]
        public async Task<IActionResult> GetTareasPorOrigen(int idOrigen)
        {
            try
            {
                var tareas = await _tareaRepo.GetTareasPorOrigen(idOrigen);
                var listaDTO = tareas.Select(t => new TareaDTO
                {
                    IdTarea = t.CN_Id_tarea,
                    IdTareaOrigen = t.CN_Tarea_origen,
                    Titulo = t.CT_Titulo_tarea ?? "",
                    Descripcion = t.CT_Descripcion_tarea ?? "",
                    MotivoEspera = t.CT_Descripcion_espera ?? "Sin motivo de espera",
                    Complejidad = t.CN_Id_complejidad,
                    Estado = t.CN_Id_estado,
                    Prioridad = t.CN_Id_prioridad,
                    NumGis = t.CN_Numero_GIS ?? "",
                    FechaAsignacion = t.CF_Fecha_asignacion,
                    FechaLimite = t.CF_Fecha_limite,
                    FechaFin = t.CF_Fecha_finalizacion,
                    Creador = t.CN_Usuario_creador,
                    Asignado = t.CN_Usuario_asignado
                }).ToList();

                return Ok(listaDTO);
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
                var t = await _tareaRepo.GetTareaById(id);
                if (t == null) return NotFound();

                var dto = new TareaDTO
                {
                    IdTarea = t.CN_Id_tarea,
                    IdTareaOrigen = t.CN_Tarea_origen,
                    Titulo = t.CT_Titulo_tarea ?? "",
                    Descripcion = t.CT_Descripcion_tarea ?? "",
                    MotivoEspera = t.CT_Descripcion_espera ?? "Sin motivo de espera",
                    Complejidad = t.CN_Id_complejidad,
                    Estado = t.CN_Id_estado,
                    Prioridad = t.CN_Id_prioridad,
                    NumGis = t.CN_Numero_GIS ?? "",
                    FechaAsignacion = t.CF_Fecha_asignacion,
                    FechaLimite = t.CF_Fecha_limite,
                    FechaFin = t.CF_Fecha_finalizacion,
                    Creador = t.CN_Usuario_creador,
                    Asignado = t.CN_Usuario_asignado
                };

                return Ok(dto);
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




        [HttpPost("{idCreador}")]
        public async Task<IActionResult> CrearTarea([FromRoute] int idCreador, [FromBody] Tareas nuevaTarea)
        {
            try
            {
                var tareaCreada = await _servTareas.CrearTarea(nuevaTarea, idCreador);

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



        //public async Task<IAC>
    }
}
