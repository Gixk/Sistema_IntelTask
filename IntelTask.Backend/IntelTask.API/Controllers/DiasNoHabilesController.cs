using IntelTask.Domain.Interface;
using Microsoft.AspNetCore.Mvc;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]



    public class DiasNoHabilesController : ControllerBase
    {
        private readonly DiaNoHabli_IRepository _repositorioDias;

        public DiasNoHabilesController(DiaNoHabli_IRepository repositorioDias)
        {
            _repositorioDias = repositorioDias;
        }



        [HttpGet]
        public async Task<IActionResult> GetDiasNoHabiles()
        {
            try
            {
                var resultado = await _repositorioDias.ObtenerDias();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
