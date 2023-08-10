using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Shared.DTOs
{
    public record class ProductDTO(int Id, string Title, int Price, string? Description, string ThumbnailImage, string[]? Images, int UserId, int CategoryId);
}
