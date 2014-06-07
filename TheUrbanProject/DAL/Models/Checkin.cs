using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Checkin
    {
        // Scalar properties
        [Key, Column(Order = 0)] // Composite primary key
        public int Id { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime Time { get; set; }

    }
}
