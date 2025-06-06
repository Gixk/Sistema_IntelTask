using IntelTask.Infrastructure.Context;
using IntelTask.Infrastructure.Repositorios;
using IntelTask.Domain.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);


//! Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("ConnectionIntel");

builder.Services.AddDbContext<IntelTaskDbContext>(options =>
                                options.UseSqlServer(connectionString));

//Registro del repositorio
builder.Services.AddScoped<IDemo, DemoRepositorio>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
