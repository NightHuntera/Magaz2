using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace JericoDataBase.Models
{
    public class PersonalArea
    {
        public int ID { get; set; }
        public string Telefon { get; set; }
        public string Addres { get; set; }
        public string FIO { get; set; }
        public string DateBirth { get; set; }
        public string Postcode { get; set; }
        
        public User User { get; set; }
        

    }
}
