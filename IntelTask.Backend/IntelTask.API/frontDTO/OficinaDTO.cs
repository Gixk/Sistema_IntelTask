namespace IntelTask.API.frontDTO
{
    public class OficinaDTO
    {
        public int CodigoOficina { get; set; }
        public string NombreOficina { get; set; } = string.Empty;
        public int? CodOficinaEncargada { get; set; }
    }
}
