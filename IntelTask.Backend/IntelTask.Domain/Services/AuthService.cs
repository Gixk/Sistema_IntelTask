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





        public async Task<String> AuthenticateUserAsync(string correo, string contra)
        {
            var autenticado = await _userRepo.VerificarUsuario(correo, contra);
            if (autenticado == null)
            {
                throw new Exception("Usuario o contraseña incorrectos");
            }

            var authData = new Autenticacion
            {
                CT_Correo_usuario = autenticado.CT_Correo_usuario,
                CT_Nombre_usuario = autenticado.CT_Nombre_usuario,
                CT_Rol = autenticado.CT_Rol
            };

            var token = GenerateToken(autenticado);

            return token;
        }




        private string GenerateToken(Autenticacion autenticado)
        {
            var claims = new[] {
                new Claim("identificador", autenticado.CN_Id_usuario.ToString()),
                new Claim("usuario", autenticado.CT_Nombre_usuario ?? ""),
                new Claim("nombre", autenticado.CT_Nombre_usuario ?? ""),
                new Claim("correo", autenticado.CT_Correo_usuario ?? ""),
                new Claim("rol", autenticado.CT_Rol?.ToString() ?? "")
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("IntelTaskSuperClaveJWT_1234567890!"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            
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
