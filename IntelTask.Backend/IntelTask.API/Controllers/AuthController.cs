using Azure.Core;
using IntelTask.Domain.Entities;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IntelTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(Servicios_Usuario service) : ControllerBase
    {
        private readonly Servicios_Usuario _service = service;
        private readonly AuthService _authService;


        [HttpPost("login")]
        public async Task<IActionResult> AuthUser([FromBody] Autenticacion auth)
        {
            try
            {
                var token = await _authService.AuthenticateUserAsync(auth);
                return Ok(new {token});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error en la autenticación", detalle = ex.Message });
            }
        }
    }
}
