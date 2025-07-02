using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using System;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

namespace IntelTask.Domain.Services
{
    public class AuthService
    {
        private readonly Usuario_IRepository _userRepo;
        private readonly IConfiguration _configuration;

        public AuthService(Usuario_IRepository userRepo, IConfiguration configuration)
        {
            _userRepo = userRepo;
            _configuration = configuration;
        }

        public async Task<String> AuthenticateUserAsync(Autenticacion auth)
        {
            var autenticado = await _userRepo.verificarUsuario(auth.CT_Correo_usuario, auth.CT_Contrasenna);
            if (autenticado == null)
            {
                throw new Exception("Usuario o contraseña incorrectos");
            }

            var token = GenerateToken(autenticado);

            return token;
        }

        private string GenerateToken(Autenticacion autenticado)
        {
            var claims = new[] {
                    new Claim("username", autenticado.CT_Nombre_usuario ?? string.Empty),
                    new Claim("email", autenticado.CT_Correo_usuario ?? string.Empty),
                    new Claim("role", autenticado.CT_Rol?.ToString() ?? string.Empty)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Clave-prueba-jwt"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Fix: Use the correct JwtSecurityToken from System.IdentityModel.Tokens.Jwt namespace
            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: "IntelTaski",
                audience: "IntelUsers",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
