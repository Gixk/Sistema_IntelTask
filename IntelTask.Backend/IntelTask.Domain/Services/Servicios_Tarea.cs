using IntelTask.Domain.Entities;
using IntelTask.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Services
{
    public class Servicios_Tarea
    {
        private readonly Usuario_IRepository _usuarioRepo;
        private readonly Tareas_IRepository _tareaRepo;

        public Servicios_Tarea(Usuario_IRepository usuarioRepo, Tareas_IRepository tareaRepo)
            {
            _usuarioRepo = usuarioRepo;
        }


        public async Task<Tareas> CrearTarea(Tareas tarea, int idCreador)
        {
            // Validar campos mínimos
            if (string.IsNullOrWhiteSpace(tarea.CT_Titulo_tarea))
                throw new Exception("El título de la tarea es obligatorio.");

            if (tarea.CF_Fecha_limite <= DateTime.Now)
                throw new Exception("La fecha límite debe ser posterior a hoy.");


            if (tarea.CN_Id_estado == 0)
                tarea.CN_Id_estado = 1; 


            // Obtener usuarios para validar jerarquía
            var creador = await _usuarioRepo.GetJerarquiaUsuario(idCreador);
            var asignado = await _usuarioRepo.GetJerarquiaUsuario(tarea.CN_Usuario_asignado);


            if (!PuedeAsignar(creador, asignado))
                throw new Exception("No tiene permisos para asignar tareas a este usuario.");


            tarea.CF_Fecha_asignacion = DateTime.Now;
            tarea.CN_Usuario_creador = idCreador;
            tarea.CN_Id_estado = 1;
            // se guarda en tarea seguimiento
            // se guarda en bitacora acciones

            return await _tareaRepo.CreateTarea(tarea);
        }

        private bool PuedeAsignar(int rolCreador, int jerarquia)
        {
            return rolCreador switch
            {
                1 => jerarquia == 2,
                2 => jerarquia == 3,
                3 => jerarquia is 4 or 5,
                4 => jerarquia is 5 or 6,
                5 => jerarquia == 6,
                _ => false
            };
        }



        // Data validation
        public async Task<Tareas> EditarTareaConValidaciones(int idTarea, Tareas nuevaInfo)
        {
            var tareaExistente = await _tareaRepo.GetTareaById(idTarea);

            if (tareaExistente == null)
                throw new Exception($"No se encontró la tarea con ID {idTarea}");


            if (!string.IsNullOrWhiteSpace(nuevaInfo.CT_Titulo_tarea))
                tareaExistente.CT_Titulo_tarea = nuevaInfo.CT_Titulo_tarea;

            if (!string.IsNullOrWhiteSpace(nuevaInfo.CT_Descripcion_tarea))
                tareaExistente.CT_Descripcion_tarea = nuevaInfo.CT_Descripcion_tarea;

            if (tareaExistente.CN_Id_estado != nuevaInfo.CN_Id_estado)
                tareaExistente.CN_Id_estado = nuevaInfo.CN_Id_estado;

            if (nuevaInfo.CN_Id_complejidad != 0)
                tareaExistente.CN_Id_complejidad = nuevaInfo.CN_Id_complejidad;

            if (nuevaInfo.CN_Id_rioridad != 0)
                tareaExistente.CN_Id_rioridad = nuevaInfo.CN_Id_rioridad;

            if (!string.IsNullOrWhiteSpace(nuevaInfo.CT_Descripcion_espera))
                tareaExistente.CT_Descripcion_espera = nuevaInfo.CT_Descripcion_espera;

            if (nuevaInfo.CF_Fecha_limite != DateTime.MinValue)
            {
                if (nuevaInfo.CF_Fecha_limite <= DateTime.Now)
                    throw new Exception("La fecha límite debe ser posterior a hoy.");
                tareaExistente.CF_Fecha_limite = nuevaInfo.CF_Fecha_limite;
            }

            if (nuevaInfo.CN_Usuario_asignado != 0)
                tareaExistente.CN_Usuario_asignado = nuevaInfo.CN_Usuario_asignado;

            await _tareaRepo.UpdateTarea(tareaExistente);
            return tareaExistente;
        }



        public bool CambiarEstadoTarea()
        {
            // Implementación pendiente
            return false; // Retorno temporal para evitar errores de compilación
        }
    }
}
