﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace evo_aspnetcore.Migrations
{
    [DbContext(typeof(DeptContext))]
    partial class DeptContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Departamento", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sigla")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departamentos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Nome = "Compras",
                            Sigla = "CPS"
                        },
                        new
                        {
                            Id = 2,
                            Nome = "Marketing",
                            Sigla = "MKT"
                        },
                        new
                        {
                            Id = 3,
                            Nome = "Vendas",
                            Sigla = "VND"
                        });
                });

            modelBuilder.Entity("Funcionario", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int?>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("Foto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RG")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Funcionarios");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DepartamentoId = 1,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Vitor",
                            RG = "28.696.883-6"
                        },
                        new
                        {
                            Id = 2,
                            DepartamentoId = 2,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Felipe",
                            RG = "27.379.523-5"
                        },
                        new
                        {
                            Id = 3,
                            DepartamentoId = 3,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Thiago",
                            RG = "29.520.228-2"
                        },
                        new
                        {
                            Id = 4,
                            DepartamentoId = 1,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Rafaela",
                            RG = "33.028.964-0"
                        },
                        new
                        {
                            Id = 5,
                            DepartamentoId = 2,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Fabiana",
                            RG = "46.449.780-2"
                        },
                        new
                        {
                            Id = 6,
                            DepartamentoId = 3,
                            Foto = "https://placehold.co/100x100",
                            Nome = "Leticia",
                            RG = "11.978.717-9"
                        });
                });

            modelBuilder.Entity("Funcionario", b =>
                {
                    b.HasOne("Departamento", "Departamento")
                        .WithMany("Funcionarios")
                        .HasForeignKey("DepartamentoId");

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("Departamento", b =>
                {
                    b.Navigation("Funcionarios");
                });
#pragma warning restore 612, 618
        }
    }
}
