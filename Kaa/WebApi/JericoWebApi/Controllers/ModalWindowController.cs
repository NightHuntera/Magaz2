using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JericoDataBase;
using JericoDataBase.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;


namespace JericoWebApi.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ModalWindowController : Controller
    {
        private JericoDbContext dbContext;

        public ModalWindowController(JericoDbContext context)
        {
            dbContext = context;
        }

      

    }
    #region private
    public class UsersDataDto
    {
        public int Price { get; internal set; }
        public string NameServise { get; internal set; }
        public int PriceProduct { get; internal set; }
    }
    public class DataFront
    {
        public int? IDService;
        public int? IDProduct;
    }
    #endregion
}