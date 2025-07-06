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
    public DbSet<UserOffice> TI_Usuario_X_Oficina { get; set; }
    public DbSet<DiasNoHabiles> NoHabiles { get; set; }
    public DbSet<Notificaciones> T_Notificaciones { get; set; }


    public DbSet<Tareas> T_Tareas { get; set; }
    public DbSet<TareaIncumplida> T_Tareas_Incumplimientos { get; set; } 
    public DbSet<TareaJustificacionRechazo> T_Tareas_Justificacion_Rechazo { get; set; }


    public DbSet<Complejidades> T_Complejidades { get; set; }
    public DbSet<Estados> T_Estados { get; set; }
    public DbSet<Prioridades> T_Prioridades { get; set; }



    public DbSet<Permiso> T_Permisos { get; set; }


    public DbSet<BitacoraAcciones> T_Bitacora_Acciones { get; set; }
    public DbSet<BitacoraCambiosEstado> T_Bitacora_Cambios_Estados { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        modelBuilder.Entity<DiasNoHabiles>().ToTable("T_Dias_No_Habiles");
        modelBuilder.Entity<DiasNoHabiles>().HasKey(d => d.CN_Id_dias_no_habiles);

        modelBuilder.Entity<Notificaciones>().ToTable("T_Notificaciones");
        modelBuilder.Entity<Notificaciones>().HasKey(n => n.CN_Id_notificacion);

        modelBuilder.Entity<EDemo>().ToTable("T_Demo");
        modelBuilder.Entity<EDemo>().HasKey(d => d.TN_Codigo);

        modelBuilder.Entity<Usuario>().ToTable("T_Usuarios");
        modelBuilder.Entity<Usuario>().HasKey(u => u.CN_Id_usuario);

        modelBuilder.Entity<Rol>().ToTable("T_Roles");
        modelBuilder.Entity<Rol>().HasKey(r => r.CN_Id_rol);

        modelBuilder.Entity<Oficina>().ToTable("T_Oficinas");
        modelBuilder.Entity<Oficina>().HasKey(o => o.CN_Codigo_oficina);

        modelBuilder.Entity<UserOffice>().ToTable("TI_Usuario_X_Oficina");
        modelBuilder.Entity<UserOffice>().HasKey(uo => new { uo.CN_Id_usuario, uo.CN_Codigo_oficina });



        modelBuilder.Entity<Tareas>().ToTable("T_Tareas");
        modelBuilder.Entity<Tareas>().HasKey(t => t.CN_Id_tarea);

        modelBuilder.Entity<TareaIncumplida>().ToTable("T_Tareas_Incumplimientos");
        modelBuilder.Entity<TareaIncumplida>().HasKey(ti => ti.CN_Id_tarea_incumplimiento);

        modelBuilder.Entity<TareaJustificacionRechazo>().ToTable("T_Tareas_Justificacion_Rechazo");
        modelBuilder.Entity<TareaJustificacionRechazo>().HasKey(tjr => tjr.CN_Id_rechazo);



        modelBuilder.Entity<Complejidades>().ToTable("T_Complejidades");
        modelBuilder.Entity<Complejidades>().HasKey(c => c.CN_Id_complejidad);

        modelBuilder.Entity<Estados>().ToTable("T_Estados");
        modelBuilder.Entity<Estados>().HasKey(e => e.CN_Id_estado);

        modelBuilder.Entity<Prioridades>().ToTable("T_Prioridades");
        modelBuilder.Entity<Prioridades>().HasKey(p => p.CN_Id_prioridad);



        modelBuilder.Entity<Permiso>().ToTable("T_Permisos");
        modelBuilder.Entity<Permiso>().HasKey(p => p.CN_Id_permiso);


        modelBuilder.Entity<BitacoraAcciones>().ToTable("T_Bitacora_Acciones");
        modelBuilder.Entity<BitacoraAcciones>().HasKey(b => b.CN_Id_bitacora);

        modelBuilder.Entity<BitacoraCambiosEstado>().ToTable("T_Bitacora_Cambios_Estados");
        modelBuilder.Entity<BitacoraCambiosEstado>().HasKey(b => b.CN_Id_cambio_estado);
    }

}
