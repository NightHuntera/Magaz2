using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace JericoDataBase.Models
{
   public class Status
    {
        public int ID { get; set; }
        public string NameStatus { get; set; }
        public ICollection<Basket> Basket { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
