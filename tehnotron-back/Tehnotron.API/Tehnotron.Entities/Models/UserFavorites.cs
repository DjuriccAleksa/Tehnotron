using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Entities.Models
{
    public class UserFavorites
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public User? User { get; set; } = null;
        public Product? Product { get; set; } = null;
    }
}
