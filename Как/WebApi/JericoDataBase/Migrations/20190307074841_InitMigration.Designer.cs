﻿// <auto-generated />
using System;
using JericoDataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JericoDataBase.Migrations
{
    [DbContext(typeof(JericoDbContext))]
    [Migration("20190307074841_InitMigration")]
    partial class InitMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JericoDataBase.Models.Catalog", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("FinalPrice");

                    b.Property<string>("Presence");

                    b.Property<int?>("ProductID");

                    b.HasKey("ID");

                    b.HasIndex("ProductID");

                    b.ToTable("Catalogs");
                });

            modelBuilder.Entity("JericoDataBase.Models.CatalogCompServices", b =>
                {
                    b.Property<int>("CatalogId");

                    b.Property<int>("CompServiceId");

                    b.Property<int?>("ModelCatalogID");

                    b.HasKey("CatalogId", "CompServiceId");

                    b.HasIndex("CompServiceId");

                    b.HasIndex("ModelCatalogID");

                    b.ToTable("CatalogCompServices");
                });

            modelBuilder.Entity("JericoDataBase.Models.Category", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NameCategory");

                    b.HasKey("ID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("JericoDataBase.Models.CompService", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NameService");

                    b.Property<string>("Price");

                    b.HasKey("ID");

                    b.ToTable("CompServices");
                });

            modelBuilder.Entity("JericoDataBase.Models.Model", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ColorModel");

                    b.Property<string>("Depth");

                    b.Property<string>("Description");

                    b.Property<string>("FreezerVolume");

                    b.Property<string>("Height");

                    b.Property<string>("NameModel");

                    b.Property<string>("RefrigeratorСapacity");

                    b.Property<string>("Volume");

                    b.Property<string>("Weight");

                    b.HasKey("ID");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("JericoDataBase.Models.ModelCatalog", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("FinalPrice");

                    b.Property<string>("NameModel");

                    b.Property<string>("Presence");

                    b.HasKey("ID");

                    b.ToTable("ModelCatalogs");
                });

            modelBuilder.Entity("JericoDataBase.Models.Product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CategoryID");

                    b.Property<int?>("ModelID");

                    b.Property<double>("Price");

                    b.HasKey("ID");

                    b.HasIndex("CategoryID");

                    b.HasIndex("ModelID");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("JericoDataBase.Models.Catalog", b =>
                {
                    b.HasOne("JericoDataBase.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductID");
                });

            modelBuilder.Entity("JericoDataBase.Models.CatalogCompServices", b =>
                {
                    b.HasOne("JericoDataBase.Models.Catalog", "Catalog")
                        .WithMany("CatalogCompServices")
                        .HasForeignKey("CatalogId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JericoDataBase.Models.CompService", "CompService")
                        .WithMany("CatalogCompServices")
                        .HasForeignKey("CompServiceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("JericoDataBase.Models.ModelCatalog")
                        .WithMany("CatalogCompServices")
                        .HasForeignKey("ModelCatalogID");
                });

            modelBuilder.Entity("JericoDataBase.Models.Product", b =>
                {
                    b.HasOne("JericoDataBase.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID");

                    b.HasOne("JericoDataBase.Models.Model", "Model")
                        .WithMany()
                        .HasForeignKey("ModelID");
                });
#pragma warning restore 612, 618
        }
    }
}
