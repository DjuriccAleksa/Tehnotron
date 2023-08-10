using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Entities.Models
{
    public class User : IdentityUser<int>
    {
        [Required(ErrorMessage = "User full name is required")]
        [MaxLength(50)]
        public string FullName { get; set; }

        public ICollection<Product> CreatedProducts { get; set; }
        public ICollection<UserFavorites> FavoriteProducts { get; set; }

        
    }
}
