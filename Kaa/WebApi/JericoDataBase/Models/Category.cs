﻿using System;
using System.Collections.Generic;
using System.Text;

namespace JericoDataBase.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string NameCategory { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
