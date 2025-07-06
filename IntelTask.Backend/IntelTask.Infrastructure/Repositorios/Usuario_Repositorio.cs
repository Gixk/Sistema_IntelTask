using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IntelTask.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

using IntelTask.Domain.Interface;
using IntelTask.Domain.Entities;



namespace IntelTask.Infrastructure.Repositorios
{
    public class Usuario_Repositorio : Usuario_IRepository
    {
        private readonly IntelTaskDbContext _context;
        private readonly UserOffice_IRepo _userOfficeRepo;
        
        
        public Usuario_Repositorio(IntelTaskDbContext context, UserOffice_IRepo userOfficeRepo) { 
            _context = context; 
            _userOfficeRepo = userOfficeRepo;
        }


        public async Task<Autenticacion?> VerificarUsuario(string correo, string contrasena)
        {
            var usuario = await _context.T_Usuarios
                .Where(u => u.CT_Correo_usuario == correo && u.CT_Contrasenna == contrasena)
                .Select(u => new Autenticacion
                {
                    CT_Nombre_usuario = u.CT_Nombre_usuario,
                    CT_Correo_usuario = u.CT_Correo_usuario,
                    CT_Contrasenna = u.CT_Contrasenna,
                    CT_Rol = u.CN_Id_rol
                })
                .FirstOrDefaultAsync();

            return usuario;
        }



        // Get all users from the database
        public async Task<List<Usuario>>  GetAllUsers()
        {
            return await _context.T_Usuarios.ToListAsync();
        }


        // Get all active users
        public async Task<List<Usuario?>> GetUsersActivos()
        {
            return await _context.T_Usuarios.Where(u => u.CB_Estado_usuario == true)
                .ToListAsync();
        }



        // Get a specific user
        public async Task<Usuario?> GetUserById(int id)
        {
            return await _context.T_Usuarios.FindAsync(id);
        }




        // add a new user and associate them with an office
        public async Task AddUser(Usuario user)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();


            try { 
                await _context.T_Usuarios.AddAsync(user);
                await _context.SaveChangesAsync();

                // Commit the transaction if everything is successful
                await transaction.CommitAsync();

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error al agregar el usuario: " + ex.Message);
            }
        }





        // Update an existing user and their office association
        public async Task UpdateUser(Usuario user)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                _context.T_Usuarios.Update(user); // Update the user entity
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error al actualizar el usuario: " + ex.Message);
            }

        }




        // Change the status of a user
        public async Task ChangeUserStatus(int id)
        {
            var user = await _context.T_Usuarios.FindAsync(id);
            if (user != null)
            {
                user.CB_Estado_usuario = !user.CB_Estado_usuario;
                _context.T_Usuarios.Update(user);
                await _context.SaveChangesAsync();
            }
        }

    }
    
}
