using IntelTask.Domain.Entities;
using IntelTask.Domain.Services; // Asegúrate de que este espacio de nombres existe y está referenciado correctamente.
using Microsoft.AspNetCore.Mvc;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly Servicios_Usuario _service;
        private readonly AuthService _authService;

        public AuthController(Servicios_Usuario service, AuthService authService)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> AuthUser([FromBody] Autenticacion auth)
        {
            try
            {
                var token = await _authService.AuthenticateUserAsync(auth);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error en la autenticación", detalle = ex.Message });
            }
        }
    }
}
