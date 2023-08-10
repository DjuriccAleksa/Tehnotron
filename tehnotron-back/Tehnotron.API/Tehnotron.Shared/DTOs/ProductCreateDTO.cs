using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Shared.DTOs
{
    public record ProductCreateDTO(string Title, int Price, string? Description, IFormFile ThumbnailImage, List<IFormFile>? Images, int UserId, int CategoryId);
}
