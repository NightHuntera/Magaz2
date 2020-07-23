using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace JericoDataBase.Models
{
    public class Storage
    {
        public int ID { get; set; }
        public byte[] AvatarImage { get; set; }
        public User User { get; set; }
        public int UserID { get; set; }
    }
}
