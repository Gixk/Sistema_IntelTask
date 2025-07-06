using IntelTask.Infrastructure.Context;
using IntelTask.Infrastructure.Repositorios;
using IntelTask.Domain.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using IntelTask.Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


//! Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("ConnectionIntel");



builder.Services.AddDbContext<IntelTaskDbContext>(options =>
                                options.UseSqlServer(connectionString));



//Registro del repositorio

builder.Services.AddScoped<IDemo, DemoRepositorio>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<Usuario_IRepository, Usuario_Repositorio>();
builder.Services.AddScoped<Rol_IRepository, Rol_Repositorio>();

builder.Services.AddScoped<Oficina_IRepository, Oficina_Repositorio>();
builder.Services.AddScoped<UserOffice_IRepo, UserOffice_Repo>();

builder.Services.AddScoped<Tareas_IRepository, Tarea_Repositorio>();
builder.Services.AddScoped<SeguimientoTarea_IRepository, SeguimientoTarea_Repositorio>();




builder.Services.AddScoped<DiaNoHabli_IRepository, DiaNoHabil_Repositorio>();



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "Clave-prueba-jwt",
            ValidAudience = "IntelUsers",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
