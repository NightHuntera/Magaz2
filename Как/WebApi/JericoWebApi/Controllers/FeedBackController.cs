using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies; 

using JericoDataBase.Models;
using JericoDataBase;
using System;
using Microsoft.AspNetCore.Authorization;

namespace JericoWebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : Controller
    {
        private JericoDbContext dbContext;
        public FeedBackController(JericoDbContext context)
        {
            dbContext = context;
        }

        [Authorize]
        [Route("Add")]
        [HttpPost]
        public async Task<IActionResult> FeedBackAdd([FromBody]Front front)
        {
            Feedback check = dbContext.Feedbacks.FirstOrDefault(u => u.UserID == front.UserID & u.ProductFeedback == front.FeedBack);
            if (check != null)
            {
                return BadRequest("Вы уже писали данный отзыв");
            }

            Feedback basket = new Feedback()
            {
                UserID = front.UserID,
                ProductFeedback = front.FeedBack,
                DateTime = DateTime.Now.ToString("HH:mm:ss dd MMMM yyyy")


            };
            dbContext.Feedbacks.Add(basket);

            dbContext.SaveChanges();
            return Json( "Отзыв добавлен" );
        }

        [Route("Storage")]
        [HttpPost]
        public async Task<IActionResult> FeedBackStorage([FromBody]Front front)
        {
            var FeedBack = dbContext
                .Feedbacks
                
                .Include(_ => _.User)
                .Select(_ => new FeedBack
                {
                    Login = _.User.Login,
                    Data = _.DateTime,
                    ProductFeedBack = _.ProductFeedback


                }).ToList();
            return Json(FeedBack);
        }
    
        public class FeedBack
        {
            public string Login { get; set; }
            public string Data { get; set; }
            public string ProductFeedBack { get; set; }

        }

        public class Front
        {
            public int UserID;
            
            public string FeedBack;
        }

    }
}