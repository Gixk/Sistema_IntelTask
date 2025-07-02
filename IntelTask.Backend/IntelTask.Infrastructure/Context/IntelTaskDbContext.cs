using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using IntelTask.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace IntelTask.Infrastructure.Context;

public class IntelTaskDbContext : DbContext
{
    public IntelTaskDbContext(DbContextOptions options) : base(options) {  }


    public DbSet<EDemo> T_Demo { get; set; }
    public DbSet<Usuario> T_Usuarios { get; set; }
    public DbSet<Rol> T_Roles { get; set; }
    public DbSet<Oficina> T_Oficinas { get; set; }
    public DbSet<UserOffice> T_Usuario_Oficina { get; set; }
    public DbSet<Tareas> T_Tareas { get; set; }
    public DbSet<TareasSeguimiento> T_Tareas_Seguimiento { get; set; }



    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<EDemo>().ToTable("T_Demo");
        modelBuilder.Entity<EDemo>().HasKey(d => d.TN_Codigo);

        modelBuilder.Entity<Usuario>().ToTable("T_Usuarios");
        modelBuilder.Entity<Usuario>().HasKey(u => u.CN_Id_usuario);

        modelBuilder.Entity<Tareas>().ToTable("T_Tareas");
        modelBuilder.Entity<Tareas>().HasKey(t => t.CN_Id_tarea);

        modelBuilder.Entity<Rol>().ToTable("T_Roles");
        modelBuilder.Entity<Rol>().HasKey(r => r.CN_Id_rol);

        modelBuilder.Entity<Oficina>().ToTable("T_Oficinas");
        modelBuilder.Entity<Oficina>().HasKey(o => o.CN_Codigo_oficina);

        modelBuilder.Entity<UserOffice>().ToTable("T_Usuario_Oficina");
        modelBuilder.Entity<UserOffice>().HasKey(uo => new { uo.CN_Id_usuario, uo.CN_Codigo_oficina });

        
    }

}
