using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services.Contracts
{
    public interface IServiceCategory
    {
        Task<IEnumerable<CategoryDTO>> GetCategories();
    }
}
