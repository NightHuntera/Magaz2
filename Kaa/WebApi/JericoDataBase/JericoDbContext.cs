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
                    NameCategory = "Нулевой цикл",
                    Description = "На этом этапе производится возведение фундамента дома и «нулевого» этажа, то есть подвала (если он есть в проекте). Выполняются следующие работы: "
                    + "1. Снятие и сохранение плодородного слоя земли на месте построек"
                    + "2. Рытьё котлована или траншей под фундамент(в зависимости от наличия подвала и типа фундамента).В случае ленточного фундамента и при отсутствии подвала выемку грунта под фундамент можно провести вручную, "
                    + "иначе лучше доверить это дело технике.После автоматизированной выемки грунта дно котлована зачищают вручную и желательно сразу после этого приступить к устройству фундамента, "
                    + "чтобы избежать замусоривания котлована в результате плохой погоды, "
                    + "обсыпания стен котлована и т.п. "
                    + "3. Закладка необходимых коммуникаций под фундаментом(канализация, водопровод и т.п.).Желательно устроить под общей плитой фундамента дренаж и дополнительную сливную трубу для канализации, "
                    + "которую затем подключить к общей трубе слива посредством специального насоса."
                    + "4. Строительство и гидроизоляция фундамента, дренаж;"
                    + "5. Установка общей заземляющей шины(в зависимости от проекта), к которой затем будет подключено заземление электросети дома;"
                    + "6. Засыпка остаточных пустот вокруг фундамента, перекрытие подвала(при его наличии)."
                },
                new Category()
                {
                    ID = 2,
                    NameCategory = "Основные строительные работы",
                    Description = "Это этап выполнения основных строительных работ: "
                    + "1. Возведение стен и перекрытие этажей "
                    + "2. Монтаж внутренних перегородок, лестниц; "
                    + "3. Строительство крыши и навесов; "
                    + "4. Установка наружных дверей, ворот(для гаража), окон; "
                    + "5. Внешняя отделка стен дома(сайдинг, штукатурка, фасадный кирпич, декоративный камень и т. п.)."
                },
                new Category()
                {
                    ID = 3,
                    NameCategory = "Проведение коммуникаций",
                    Description = "На этом этапе проводятся все основные коммуникации в доме и устанавливается часть инженерного оборудования: "
                    + "1. Электрическая сеть(монтируется главный щит, прячется в стены основная проводка, делаются подрозетники и ставятся временные розетки); "
                    + "2. Водопровод(прокладываются трубы, ставятся временные краны и заглушки); "
                    + "3. Канализация; "
                    + "4. Система отопления(трубы, нагревательный котёл); "
                    + "5. Газ(при наличии). "
                    + "6. Вентиляция и кондиционирование(вентиляционные короба и инженерное оборудование кроме внутренних блоков, которые монтируются на этапе внутренней отделки); "
                    + "7. Охранно - пожарная сигнализация, видеонаблюдение, интернет и телевидение(закладка кабельных линий)."
                },
                new Category()
                {
                    ID = 4,
                    NameCategory = "Внутренняя отделка",
                    Description =
                      "1. Оформление потолков (покраска, подвесные или натяжные потолки); "
                    + "2. Обработка стен(выравнивание, шпаклевка, поклейка обоев и т.п.); "
                    + "3. Стяжка пола(для бетонных полов), укладка напольных покрытий; "
                    + "4. Установка межкомнатных дверей; "
                    + "5. Окончательный монтаж инженерного оборудования(осветительные приборы и розетки, датчики и управляющие блоки охранно-пожарной сигнализации, компьютерная сеть, телевизионное оборудование, радиаторы отопления, и т.п.); "
                },
                new Category()
                {
                    ID = 5,
                    NameCategory = "Оформление интерьера и ландшафтный дизайн",
                    Description = "Это последний этап, на котором интерьер дома и внешний вид участка окончательно приводят к желаемому виду. "
                    + "1. Установка забора,ворот и калитки; "
                    + "2. Устройство дорожек и подъездного пути к гаражу; "
                    + "3. Разбивка цветников, живых изгородей, навесов из вьющихся растений(декоративный плющ, дикий виноград); "
                    + "4. Обустройство бассейна и т.д."
                }
                );



        }
    }
}
