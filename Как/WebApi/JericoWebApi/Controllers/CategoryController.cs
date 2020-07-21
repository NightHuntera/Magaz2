﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JericoDataBase;
using JericoDataBase.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace JericoWebApi.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : Controller
    {

        private JericoDbContext dbContext;

        public CategoryController(JericoDbContext context)
        {
            dbContext = context;
        }





        [Route("Status")]
        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> status()
        {
            var categs = dbContext
                .Statuse
               .Select(_ => new CategoryDto
               {
                   ID = _.ID,
                   NameStatus = _.NameStatus
               }).ToList();

            return categs;

        }

        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> GetList()
        {
            var categs = dbContext
                .Categories
               .Select(_ => new CategoryDto
               {
                   ID = _.ID,
                   NameCategory = _.NameCategory
               }).ToList();

            return categs;

        }
    }

    public class CategoryDto
    {
        public int ID { get; internal set; }
        public string NameCategory { get; internal set; }
        public string NameStatus { get; internal set; }
    }
}