using System;
using System.Collections.Generic;
using System.Text;

namespace JericoDataBase.Models
{
    public class Feedback
    {
        public int ID { get; set; }
        public string ProductFeedback { get; set; }


        public string DateTime { get; set; }
        
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
