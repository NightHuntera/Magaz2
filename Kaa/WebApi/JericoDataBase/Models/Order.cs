using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace JericoDataBase.Models
{
    public class Order
    {
        public int ID { get; set; }
        public string FIO { get; set; }
        public string Address { get; set; }
        public int Postcode { get; set; }

        public User User { get; set; }        
        public int UserrID { get; set; }

        public Basket basket { get; set; }        
        public int BasketID { get; set; }

       
        public int NumberOrder { get;set; }

        public string Data { get; set; }
    }
}
