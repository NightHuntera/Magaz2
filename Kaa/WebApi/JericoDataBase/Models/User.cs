using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace JericoDataBase.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Login { get; set; }
        public ICollection<Basket> Basket { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
        public ICollection<Order> Orders { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }      
        public byte[] Image { get; set; }
         
        [JsonIgnore]
        public TypeUser TypeUser { get; set; }

        [ForeignKey("TypeUser")]
        public int TypeUserID { get; set; }

        public PersonalArea PersonalArea { get; set; }
        public int? PersonalAreaID { get; set; }
    }
}
