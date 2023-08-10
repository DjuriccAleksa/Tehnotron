using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;
using Tehnotron.Interfaces;
using Tehnotron.Repository.Context;

namespace Tehnotron.Repository
{
    public class RepositoryCategory : RepositoryBase<Category>, IRepositoryCategory
    {
        public RepositoryCategory(TehnotronContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Category>> GetAllCategories() => await
            GetAll()
            .OrderBy(c => c.Name)
            .ToListAsync();
    }
}
