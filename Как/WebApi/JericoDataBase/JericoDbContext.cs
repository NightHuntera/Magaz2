using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JericoDataBase.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.IO;

namespace JericoDataBase
{



    public class JericoDbContext : DbContext
    {
public DbSet<Basket> Baskets { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Status> Statuse { get; set; }
        public DbSet<TypeUser> TypeUsers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<PersonalArea> PersonalAreas { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Storage> Storages { get; set; }
        


        public JericoDbContext(DbContextOptions<JericoDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            modelBuilder.Entity<Status>().HasData(
                new Status
                {
                    ID = 1,
                    NameStatus = "Начальный"
                },
                new Status
                {
                    ID = 2,
                    NameStatus ="Новый"
                },
                new Status
                {
                    ID = 3,
                    NameStatus = "Принятый"
                },
                new Status
                {
                    ID = 4,
                    NameStatus = "Оконченный"
                }
                );




            modelBuilder.Entity<TypeUser>().HasData(
                new TypeUser
                {
                    ID = 1,
                    TypeUsers = "Админ"
                },
                new TypeUser
                {
                    ID = 2,
                    TypeUsers = "Бухгалтер"
                },
                    new TypeUser
                {
                    ID = 3,
                    TypeUsers = "Пользователь"
                }
                );

            
            modelBuilder.Entity<Model>().HasData(
            new Model
            {
                ID = 1,
                NameModel = "Черновая отделка",
                Description = "Отделка гипсокартоном." +
                "Это черновой вид отделки, подразумевающий впоследствии чистовую отделку. Используется для лёгкого и быстрого выравнивания стены." +
                " Работа не сопровождается большими мусорными отходами и грязью. Подходит для любой комнаты в жилом доме."

            }
            );
            modelBuilder.Entity<PersonalArea>().HasData(
                new PersonalArea
                {
                    ID = 1,
                    Addres = "Заполните данные",
                    FIO = "Заполните данные",
                    Postcode = "Заполните данные",
                    Telefon = "Заполните данные",
                    DateBirth = "Заполните данные"
                }



                );
            DirectoryInfo directorys = new DirectoryInfo(@"Image");
            string image = directorys.FullName + "\\" + "Avatar.jpg";
            MemoryStream memoryStream = new MemoryStream();

            FileStream fs = new FileStream(image, FileMode.Open, FileAccess.Read);
            // Create a byte array of file stream length
            byte[] ImageData = new byte[fs.Length];
            //Read block of bytes from stream into the byte array
            fs.Read(ImageData, 0, System.Convert.ToInt32(fs.Length));
            //Close the File Stream
            fs.Close();

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    ID=1,
                    Login="Recrut",
                    Email="Bogamesalex@mail.ru",
                    Password="#123#123#",
                    TypeUserID=2,
                    PersonalAreaID = 1,
                    Image = ImageData
                });

            modelBuilder.Entity<Product>().HasData(
                new Product()
                {
                    ID = 1,
                    CategoryID = 3,
                    ModelID = 1
                }
                );



            modelBuilder.Entity<Category>().HasData
                (
                new Category()
                {
                    ID = 1,
                    NameCategory = "Сантехника"
                },
                new Category()
                {
                    ID = 2,
                    NameCategory = "Электроника"
                },
                new Category()
                {
                    ID = 3,
                    NameCategory = "Отделка стен и потолка"
                },
                new Category()
                {
                    ID = 4,
                    NameCategory = "Комплектующие холодильников"
                }

                );



        }
    }
}
