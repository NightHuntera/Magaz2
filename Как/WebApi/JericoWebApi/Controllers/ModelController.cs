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
    public class ModelController : Controller
    {
        private JericoDbContext db;
        public ModelController(JericoDbContext context)
        {
            db = context;
        }

        [Route("Image")]
        [HttpGet]
        public async Task<IActionResult> get(int productID)
        {
            System.IO.DirectoryInfo directory = new System.IO.DirectoryInfo(@"Image");
            string path = directory.FullName + "\\";
            var image = System.IO.File.OpenRead(path + productID.ToString() + @".jpg");
            return File(image, "image/jpeg");
        }


        [Route("Model")]
        [HttpPost] 
        public async Task <IActionResult> PostList([FromBody]Front front) //[FromQuery] TFiltewr filter = null,
        {

            var items = db
                    .Products
                    .Include(_=>_.Model)                   
                    .Where(_ => front.productID == _.ID)
                    .Select(_ => new ModelDto
                    {

                        NameModel = _.Model.NameModel,
                      
                        
                        productID =_.ID

                    }).ToList();

            return Json (items);
        }

        public class ModelDto
        {
            public int productID { get; internal set; }
            public string NameModel { get; internal set; }
            public string ColorModel { get; internal set; }
            public string Height { get; internal set; }
            public string Weight { get; internal set; }
            public string Volume { get; internal set; }
            public string FreezerVolume { get; internal set; }
            public string Capaci { get; internal set; }
            public string Depth { get; internal set; }
            public int Price { get; internal set; }
        }

        public class Front
        {
            public int productID;

        }
    }
}