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


    public DbSet<EDemo> T_Demo { get; set; } // Propiedad para la entidad EDemo


    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<EDemo>().ToTable("T_Demo");
        modelBuilder.Entity<EDemo>().HasKey(d => d.TN_Codigo);
    }

}
