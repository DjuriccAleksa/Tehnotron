using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;

namespace Tehnotron.Interfaces
{
    public interface IRepositoryProduct
    {
        Task<IEnumerable<Product>> GetAllProducts();
        Task<IEnumerable<Product>> GetAllProductsForUser(int id);
        Task<Product> GetProduct(int id);
        void CreateProduct(Product product);
        void DeleteProduct(Product product);

    }
}
