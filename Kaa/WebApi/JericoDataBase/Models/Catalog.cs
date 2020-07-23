using System;
using System.Collections.Generic;
using System.Text;

namespace JericoDataBase.Models
{
    public class Catalog
    {
        public int ID { get; set; }
        public Product Product { get; set; }
        public string Presence { get; set; }
        public string Description { get; set; }
        public string FinalPrice { get; set; }       
    }
}
