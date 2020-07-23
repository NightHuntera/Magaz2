using System;
using System.Collections.Generic;
using System.Text;

namespace JericoDataBase.Models
{
    public class TypeUser
    {
        public int ID { get; set; }
        public string TypeUsers { get; set; }
        public ICollection<User> User { get; set; }
    }
}
