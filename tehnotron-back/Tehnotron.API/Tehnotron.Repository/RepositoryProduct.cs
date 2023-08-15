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
    public class RepositoryProduct : RepositoryBase<Product>, IRepositoryProduct
    {
        public RepositoryProduct(TehnotronContext context) : base(context)
        {
        }

        public void CreateProduct(Product product) => Create(product);

        public void DeleteProduct(Product product) =>  Delete(product);

        public async Task<IEnumerable<Product>> GetAllProducts() => await
            GetAll()
            .Include(p => p.User)
            .OrderBy(p => p.CategoryId)
            .ToListAsync();

        public async Task<IEnumerable<Product>> GetAllProductsForUser(int id) => await 
            GetByCondition(p => p.UserId == id)
            .Include(p => p.User)
            .OrderBy(p => p.Title)
            .ToListAsync();

        public async Task<Product> GetProduct(int id) => await
            GetByCondition(p => p.Id == id)
            .SingleOrDefaultAsync();
    }
}
