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
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.IO;
using System.Net.Http;
using System.Security.Permissions;
using System;
using Microsoft.AspNetCore.Authorization;


namespace JericoWebApi.Controllers
{
    
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : Controller
    {
        private JericoDbContext dbContext;


        public AuthorController(JericoDbContext context)
        {
            dbContext = context;
        }



        [Route("Rec")]
        [HttpGet]
        public async Task<IActionResult> get(int UserID)
        {
            User check = dbContext.Users.FirstOrDefault(u => u.ID == UserID);
            if (check != null)
            {
                
                return File(check.Image, "image/jpeg");
            }
            return File(check.Image, "image/jpeg");
        }

        [Authorize]
        [Route("UploadFiles")]
        [HttpPost]
        public async Task<IActionResult> Post(IFormFile file)
        {
            var UserID = HttpContext.User.FindFirst(c => c.Type == ClaimsIdentity.DefaultIssuer);
            var Ud = UserID.Value;
            var stream = file.OpenReadStream();
            byte[] data = new byte[stream.Length];
            stream.ReadAsync(data, 0, (int)file.Length);
            stream.Close();
            
            User check = dbContext.Users.FirstOrDefault(u => u.ID.ToString() == Ud);
            if (check != null)
            {
                check.Image = data;
                dbContext.SaveChanges();

            }                     
            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(check);
        }


        // Вход в систему.
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]DataLogin loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            User user = await dbContext.Users
                .Include(u => u.TypeUser)
                .Include(u => u.PersonalArea)
                .FirstOrDefaultAsync(u => u.Password == loginModel.password && u.Email == loginModel.login);
            if (user != null)
            {
                await Authenticate(user);
            }
            else
                return BadRequest("Некорректные логин и(или) пароль");
            var response = new
            {
                user.ID,
                user.Login,
                user.Email,
                user.TypeUserID,
                user.PersonalArea.Telefon,
                user.PersonalArea.Addres,
                user.PersonalArea.Postcode,
                user.PersonalArea.DateBirth,
                user.PersonalArea.FIO
                
            };
           
            return Json(response );
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Reg([FromBody]Regist regist)
        {



            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            User check = dbContext.Users.FirstOrDefault(u => u.Email == regist.Mail);
            if (check != null)
            {
                return Json("Такой E-mail уже зарегистрирован");
            }
            //обрезаем мыло
            char atSign = '@';
            string login = regist.Mail.Split(atSign)[0];
            PersonalArea personalArea = new PersonalArea()
            {
                Telefon = "Заполните данные",
                Addres = "Заполните данные",
                FIO = "Заполните данные",
                DateBirth = "Заполните данные",
                Postcode = "Заполните данные"
            };
            dbContext.PersonalAreas.Add(personalArea);

            DirectoryInfo directory = new DirectoryInfo(@"Image");
            string image = directory.FullName + "\\" + "Avatar.jpg";
            MemoryStream memoryStream = new MemoryStream();
            
            FileStream fs = new FileStream(image, FileMode.Open, FileAccess.Read);
            // Create a byte array of file stream length
            byte[] ImageData = new byte[fs.Length];
            //Read block of bytes from stream into the byte array
            fs.Read(ImageData, 0, System.Convert.ToInt32(fs.Length));
            //Close the File Stream
            fs.Close();

            User user = new User()
            {
                Login = login,
                Email = regist.Mail,
                Password = regist.Password,
                TypeUserID = 3,
                PersonalAreaID = personalArea.ID,
                Image = ImageData
                // 1 - Админ, 2 - Бухгалиер, 3  - пользователь
            };
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return Json("Регистрация проведенна успешно");
        }


        [Authorize]
        [Route("update")]
        [HttpPost]
        public async Task<IActionResult> Upd([FromBody]AreaFront front)
        {
            var result = dbContext.PersonalAreas
                .Include(_=>_.User)
                .SingleOrDefault(_ => _.ID == front.UserID);
            
            if (result != null)
            {
                result.Telefon = front.Telefon;
                result.Postcode = front.Postcode;
                result.FIO = front.FIO;
                result.DateBirth = front.DateBirth;
                result.Addres = front.Addres;
                dbContext.SaveChanges();
            }

            var response = new
            {
                result.ID,
                result.User.Login,
                result.User.Email,
                result.User.TypeUserID,
                result.Telefon,
                result.Addres,
                result.Postcode,
                result.DateBirth,
                result.FIO
            };
            return Json(response);
        }            

            public async Task Authenticate(User user)
            {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultIssuer, user.ID.ToString()),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.TypeUser?.TypeUsers)
            };
        
            var  identity = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            var authProperties = new AuthenticationProperties
            {
                //AllowRefresh = true,
                // Refreshing the authentication session should be allowed.

                // ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(5),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };


            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProperties);

        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            // return Ok();
            return Json("");
        }

        #region private

        public class DataLogin
        {
            public string login;
            public string password;
        }

        public class Regist
        {
            [EmailAddress]
            public string Mail;
            public string Password;
            
        }

        public class AreaFront
        {
            public int UserID;
            public string Telefon;
            public string Addres;
            public string FIO;
            public string DateBirth;
            public string Postcode;
            public int BasketID;
        }

        public class PersonalAreaDTO
        {
            public string Telefon { get; internal set; }
            public string Addres { get; internal set; }
            public string FIO { get; internal set; }
            public string DateBirth { get; internal set; }
            public string Postcode { get; internal set; }
            public int UserID { get; internal set; }
            #endregion
        }
    }
}
