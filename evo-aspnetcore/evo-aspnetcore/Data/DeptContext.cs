using EvoTest.Models;
using Microsoft.EntityFrameworkCore;

namespace EvoTest.Data
{
    public class DeptContext : DbContext
    {
        public DeptContext(DbContextOptions<DeptContext> options) : base(options)
        {
        }

        public DbSet<Departamento> Departamentos { get; set; }

        public DbSet<Funcionario> Funcionarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Departamento>().HasData(new List<Departamento>() {
                new Departamento(1,"Compras", "CPS"),
                new Departamento(2,"Marketing", "MKT"),
                new Departamento(3,"Vendas", "VND")
            });

            modelBuilder.Entity<Funcionario>().HasData(new List<Funcionario>() {
                new Funcionario(1,"Vitor", "https://placehold.co/100x100", "28.696.883-6", 1),
                new Funcionario(2,"Felipe", "https://placehold.co/100x100", "27.379.523-5", 2),
                new Funcionario(3,"Thiago", "https://placehold.co/100x100", "29.520.228-2", 3),
                new Funcionario(4,"Rafaela", "https://placehold.co/100x100", "33.028.964-0", 1),
                new Funcionario(5,"Fabiana", "https://placehold.co/100x100", "46.449.780-2", 2),
                new Funcionario(6,"Leticia", "https://placehold.co/100x100", "11.978.717-9", 3)
            });
        }

    }
}