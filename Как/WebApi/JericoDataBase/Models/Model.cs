using System;
using System.Collections.Generic;
using System.Text;

namespace JericoDataBase.Models
{
    public class Model
    {
        public int ID { get; set; }
        public string NameModel { get; set; }
        public byte[] Image { get; set; }
        public string Description { get; set; }

    }
}
