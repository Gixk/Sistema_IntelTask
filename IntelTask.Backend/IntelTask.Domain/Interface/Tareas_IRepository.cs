using IntelTask.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelTask.Domain.Interface
{
    public interface Tareas_IRepository
    {
        Task<bool> existeTarea(int id);

        Task<List<Tareas>> GetAllTareas();

        Task<Tareas> GetTareaById(int id);

        Task<Tareas> CreateTarea(Tareas tarea);

        Task<bool> UpdateTarea(Tareas tarea);

        Task ChangeStateTarea(int id, int estado);

        Task<List<Tareas>> GetTareasPorOrigen(int idOrigen);
    }
}
