using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services.Contracts
{
    public interface IServiceProduct
    {
        Task<IEnumerable<ProductDTO>> GetAllProducts();
        Task<IEnumerable<ProductDTO>> GetProductsForUser(int id);
        Task<ProductDTO> GetProductById(int id);
        Task<ProductDTO> CreateProduct(ProductCreateDTO product);
        Task DeleteProduct(int id);
    }
}
