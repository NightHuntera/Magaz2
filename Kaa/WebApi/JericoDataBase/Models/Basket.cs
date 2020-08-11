using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace JericoDataBase.Models
{
    public class Basket
    {
        public int ID { get; set; }
        public int Amount { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        
        public int StatusID { get; set; }
        public Status Status { get; set; }
    }
}
