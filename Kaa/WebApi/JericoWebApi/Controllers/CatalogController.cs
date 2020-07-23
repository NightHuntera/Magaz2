using System.Collections.Generic;
using System.Linq;
using JericoDataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using JericoDataBase.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace JericoWebApi.Controllers
{
    [Authorize]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]

    public class CatalogController : Controller
    {
        private JericoDbContext dbContext;

        public CatalogController(JericoDbContext context)
        {
            dbContext = context;
        }

        [AllowAnonymous]
        [Route("Rec")]
        [HttpGet]
        public async Task<IActionResult> get(int productID)
        {
            System.IO.DirectoryInfo directory = new System.IO.DirectoryInfo(@"Image");
            string path = directory.FullName + "\\";
            var image = System.IO.File.OpenRead(path + productID.ToString() + @".jpg");
            return File(image,"image/jpeg");
        }

      
        [AllowAnonymous]
        [Route("Catalog")]
        [HttpPost] //  [HttpGet("{filter.id}")]
        public ActionResult<IEnumerable<ProductDto>> PostList([FromBody] TFilter filter) //[FromQuery] TFiltewr filter = null,
        {


            var items = dbContext
                    .Products
                    .Include(_ => _.Category)
                    .Include(_ => _.Model)
                    .Where(_ => filter.CategoryId == null || _.Category.ID == filter.CategoryId)
                    //  .Where(_ => filter.MinPrice == null || filter.MinPrice <= _.Price)
                    
                    //  .Where(_ => filter.MaxPrice == null || filter.MaxPrice >= _.Price)
                    .Select(_ => new ProductDto
                    {
                        ProductID = _.Model.ID,
                        Name = _.Model.NameModel,
                           
                       
                        Description = _.Model.Description                
                    }).ToList();
            return items;

        }

     
    }
    #region private

    public class ProductDto
    {
        public int ProductID { get; internal set; }
        public string Description { get; internal set; }
        public double Price { get; internal set; }
        public string Name { get; internal set; }
       
        public string TypeCompressor { get; internal set; }
        public string ColorModel { get; internal set; }
        public string Height { get; internal set; }
        public string Depth { get; internal set; }
        public string Weight { get; internal set; }
        public string Volume { get; internal set; }
        public string FreezerVolume { get; internal set; }
        public string RefrigeratorСapacity { get; internal set; }
    }

    public class ProductID
    {
        public int productID;
    }

    public class TFilter
    {
        public int? CategoryId;
        public int? MaxPrice;
        public int? MinPrice;
    }
    #endregion
}