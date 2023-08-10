using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services.Contracts
{
    public interface IServiceUserFavorites
    {
        Task<IEnumerable<ProductDTO>> GetUserFavorites(int id);
        Task<ProductDTO> GetUserFavorite(int userId, int productId);
        Task DeleteUserFavorite(int userId, int favoriteId);
        Task<UserFavoriteDTO> CreateUserFavorite(UserFavoriteCreateDTO userFavoriteCreate);
    }
}
