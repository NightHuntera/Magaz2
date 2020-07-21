using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JericoDataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JericoDataBase.Models;



namespace JericoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : Controller
    {
        private JericoDbContext db;
        public ValuesController(JericoDbContext context)
        {
            db = context;
        }
        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            string path = Path.GetDirectoryName("@1.jpg");
            var file = System.IO.File.ReadAllBytes(@"\2.jpg");
            return File(file,"jpg");
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            string path = Path.GetDirectoryName("@1.jpg");

            return File(path, ".jpg");
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
