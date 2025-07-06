namespace IntelTask.API.frontDTO
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public DateTime? FechaNac { get; set; }
        public string Contra { get; set; } = string.Empty;
        public bool EstadoUsuario { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public int RolUsuario { get; set; }
    }
}
