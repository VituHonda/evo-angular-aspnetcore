using System.ComponentModel.DataAnnotations;

namespace EvoTest.Models
{
    public class Departamento
    {
        [Key]
        public int? Id { get; set; }
        public string? Nome { get; set; }
        public string? Sigla { get; set; }
        public List<Funcionario>? Funcionarios { get; set; }

        public Departamento() { }
        public Departamento(int id, string nome, string sigla)
        {
            this.Id = id;
            this.Nome = nome;
            this.Sigla = sigla;
        }
    }
}
