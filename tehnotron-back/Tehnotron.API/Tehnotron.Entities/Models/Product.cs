using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Entities.Models
{
    public class Product
    {
        [Column("ProductId")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Product title is required")]
        [MaxLength(60)]
        public string Title { get; set; }
        [Required(ErrorMessage = "Product price is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Price has to be greater then 1")]
        public int Price { get; set; }
        public string? Description { get; set; }
        [Required(ErrorMessage = "Product thumbnail image is required")]
        public string ThumbnailImage { get; set; }
        public string[]? Images { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }

        public User? User { get; set; }
        public Category? Category { get; set; }

        public List<UserFavorites> FavoritesUser{ get; set; }
    }
}
