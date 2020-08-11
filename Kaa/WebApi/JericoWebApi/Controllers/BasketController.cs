using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JericoDataBase.Models;
using JericoDataBase;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System;
using System.Net;
using System.IO;
using System.Net.Mime;
using System.Web;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace JericoWebApi.Controllers
{
    
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : Controller
    {
        private JericoDbContext dbContext;
        public string asda;
        public int price;
        public BasketController(JericoDbContext context)
        {
            dbContext = context;
        }


        [Route("BasketStorage")]
        [HttpPost]         //  [HttpGet("{filter.id}")]
        public ActionResult<IEnumerable<Baskets>> BasketStorage([FromBody] BasketAdd front) //[FromQuery] TFiltewr filter = null,
        {
            var Basket = dbContext
                .Baskets
                .Include(_ => _.Product)   
                .Include(_ =>_.Product.Model)
                .Include(_ => _.User)
                .Where(_ => _.User.ID == front.UserID && _.StatusID == 1)
                .Select(_ => new Baskets
                {
                    BasketID= _.ID,
                    ProductID = _.Product.ID,
                    NameProduct=_.Product.Model.NameModel
                  
                    
                   
                    

                }).ToList();
            int a = Basket.Count;
            return Basket;
        }

        [Route("Delete")]
        [HttpPost]
        public ActionResult<IEnumerable<Baskets>> Delete([FromBody]BasketAdd front)
        {
            Basket basketDel = dbContext.Baskets
            .Where(_ => _.ID == front.BasketID)
            .FirstOrDefault();
            dbContext.Baskets.Remove(basketDel);
            dbContext.SaveChanges();

            var Basket = dbContext
                .Baskets
                .Include(_ => _.Product)
                .Include(_ => _.Product.Model)
                .Include(_ => _.User)
                .Where(_ => _.User.ID == front.UserID)
                .Select(_ => new Baskets
                {
                    BasketID = _.ID,
                    ProductID = _.Product.ID,
                    NameProduct = _.Product.Model.NameModel,
                   
                    Amount = _.Amount


                }).ToList();
            return Basket;
        }

        [Route("OrderAdd")]
        [HttpPost]
        public async Task<IActionResult> Order([FromBody]OrderAdd orderAdd)
        {
            var customers = dbContext.Baskets;
            Order orders = new Order()
            {
                UserID = orderAdd.UserID,
                Data = DateTime.Now.ToString("HH:mm:ss dd MMMM yyyy"),
                StatusID = 1
            };
            dbContext.Orders.Add(orders);

            dbContext.SaveChanges();
            

            foreach (Basket customer in customers
                .Include(_ => _.User)
                .Where(_ => _.User.ID == orderAdd.UserID && _.StatusID == 1)
                .ToList())

                customer.StatusID = 2;
                dbContext.SaveChanges();






            /*  SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587);
              smtp.Credentials = new NetworkCredential("jerico.company@mail.ru", "V1357Olqa");
              MailAddress from = new MailAddress("jerico.company@mail.ru", "Jerico");
              MailAddress to = new MailAddress(order.Email);
              MailMessage m = new MailMessage(from, to);

              User user = dbContext
                  .Users
                  .Include(_ => _.PersonalArea)
                  .FirstOrDefault(_ => _.ID == order.UserID);

              foreach (Basket customer in customers
                  .Include(_ => _.Product)
                  .Include(_ => _.Product.Model)
                  .Include(_ => _.User)
                  .Where(_ => _.User.ID == order.UserID)
                  .ToList())
                  asda += customer.Product.Model.NameModel + " в количестве: " + customer.Amount + " Шт.<br>";

              foreach (Basket customer in customers
                  .Include(_ => _.Product)
                  .Include(_ => _.Product.Model)
                  .Include(_ => _.User)
                  .Where(_ => _.User.ID == order.UserID)
                  .ToList())


              m.Subject = "Ваш заказ <Jerico>";
              m.Body =  "<h2>Здравствуйте уважаемый " + order.FIO + "</h2><br>" +
                        "<label>Ваш заказ под номером " + "<br>" +
                        "Принят на обработку <br>" +
                        "В него входят такие товары, как : <br>" +
                         asda + "  <br>" +

                        "Если данные введенные не правильно, то товар может быть доставлен не туда, куда нужно <br>" +
                        "Спасибо за ваш заказ!<br></label>";
              m.Priority = MailPriority.Normal;
              m.IsBodyHtml = true;
              m.BodyEncoding = Encoding.UTF8;
              smtp.EnableSsl = true;
              smtp.Send(m);
              m.Dispose();*/


            var Basket = dbContext
                 .Baskets
                 .Include(_ => _.Product)
                 .Include(_ => _.Product.Model)
                 .Include(_ => _.User)
                 .Where(_ => _.User.ID == orderAdd.UserID && _.StatusID == 1)
                 .Select(_ => new Baskets
                 {
                     BasketID = _.ID,
                     ProductID = _.Product.ID,
                     NameProduct = _.Product.Model.NameModel,

                     Amount = _.Amount


                 }).ToList();
            return Json(Basket);

        }
        
        [Route("OrderStorage")]
        [HttpPost]
        public async Task<IActionResult> OrderStorage([FromBody] BasketAdd front)
        {
            var Basket = dbContext
                .Baskets
                .Include(_ => _.User.Orders)
                .Include(_ => _.User.PersonalArea)
                
                .Where(_ => _.User.ID == front.UserID && _.StatusID != 1)
                .Select(_ => new Baskets
                {
                    BasketID = _.ID,
                    ProductID = _.Product.ID,
                    NameProduct = _.Product.Model.NameModel,
                    Amount = _.Amount,
                    UserID = _.User.ID,
                    Email = _.User.Email,
                    Name = _.User.PersonalArea.FIO,
                    Status = _.Status.NameStatus


                }).ToList();

            var Order = dbContext
                .Orders
                .Include(_=>_.Status)
                .Include(_ => _.User)
                .Include(_ => _.User.PersonalArea)
                .Select(_ => new Orders
                {
                    OrderID = _.ID,
                    UserID = _.User.ID,
                    Email = _.User.Email,
                    Name = _.User.PersonalArea.FIO,
                    Status = _.Status.NameStatus

                }).ToList();
             return Json(Basket);
            
        }

        [Route("OrderProduct")]
        [HttpPost]
        public async Task<IActionResult> OrderProduct([FromBody] OrderAdd front)
        {
            var Basket = dbContext
                 .Baskets
                 .Include(_=>_.User.Orders)
                 .Where(_ => _.User.ID == front.UserID && _.StatusID != 1)
                 .Select(_ => new Baskets
                 {
                     BasketID = _.ID,
                     ProductID = _.Product.ID,
                     NameProduct = _.Product.Model.NameModel,
                     Amount = _.Amount


                 }).ToList();
            return Json(Basket);
        }

        [Route("BasketAdd")]
        [HttpPost]         //  [HttpGet("{filter.id}")]
        public async Task<IActionResult> BasketAdd([FromBody] BasketAdd front) //[FromQuery] TFiltewr filter = null,
        {
            Basket check = dbContext.Baskets.FirstOrDefault(u => u.UserID == front.UserID & u.ProductID == front.productID);
            if (check != null)
            {
                return BadRequest("Товар уже в корзине");
            }

            Basket basket = new Basket()
            {
                UserID = front.UserID,
                ProductID = front.productID,
                StatusID = 1
                
            };
            dbContext.Baskets.Add(basket);
         
            dbContext.SaveChanges();
            return Json("Товар добавлен в корзину");
        }

        

    }

    #region private
    public class Orders
    {
        public int OrderID { get; internal set; }
        public int UserID { get; internal set; }
        public string Name { get; internal set; }
        public string Email { get; internal set; }
        public string Status { get; internal set; }
    }
    public class Baskets
    {
        public int BasketID { get; internal set; }
        public int ProductID { get; internal set; }
        public string NameProduct { get; internal set; }
        public int Price { get; internal set; }
        public int Amount { get; internal set; }
        public string Status { get; internal set; }
        public int OrderID { get; internal set; }
        public int UserID { get; internal set; }
        public string Name { get; internal set; }
        public string Email { get; internal set; }
        
    }

    public class OrderAdd
    {
        public int UserID;
        public string Adress;
    }

    public class BasketAdd
    {
       
        public int UserID;
        public int productID;
        public int Amount;
        public int BasketID;
        public int Telefon;
        public string Email;
        public string Addres;
        public int Postcode;
        public int Status;
        public string FIO;
    }

    
    #endregion

}