using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace JericoDataBase.Models
{
    /// <summary>
    /// товар
    /// </summary>
    public class Product
    {
        public int ID { get; set; }

        public Category Category { get; set; }

        [ForeignKey("Category")]
        public int CategoryID { get; set; }
        public ICollection<Order> Order { get; set; }
        public ICollection<Basket> Basket { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
        
        public Model Model { get; set; }

        [ForeignKey("Model")]
        public int ModelID { get; set; }

        

        

        /*[ForeignKey("CompService")]
        public int CompServiceID { get; set; }
    */
    }

}
