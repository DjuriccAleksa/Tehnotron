using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;

namespace Tehnotron.Interfaces
{
    public interface IRepositoryCategory
    {
        Task<IEnumerable<Category>> GetAllCategories();
    }
}
