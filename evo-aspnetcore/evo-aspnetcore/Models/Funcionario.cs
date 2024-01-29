using System.ComponentModel.DataAnnotations;

namespace EvoTest.Models
{
    public class Funcionario
    {
        [Key]
        public int? Id { get; set; }
        public string? Nome { get; set; }
        public string? Foto{ get; set; }    
        public string? RG { get; set; }
        public Departamento? Departamento { get; set; }
        public int? DepartamentoId { get; set; }

        public Funcionario() { }
        public Funcionario(int id, string nome, string foto, string rg, int departamentoId)
        {
            this.Id = id;
            this.Nome = nome;
            this.Foto = foto;
            this.RG = rg;
            this.DepartamentoId = departamentoId;
        }
    }
}
