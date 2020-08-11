using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace JericoDataBase.Models
{
    public class Order
    {
        public int ID { get; set; }        
        public User User { get; set; }        
        public int UserID { get; set; }
        public string Data { get; set; }
        public Status Status { get; set; }
        public int StatusID { get; set; }
    }
}
