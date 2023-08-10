using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;

namespace Tehnotron.Interfaces
{
    public interface IRepositoryUserFavorites
    {
        Task<IEnumerable<UserFavorites>> GetAllUserFavorites(int id);
        Task<UserFavorites> GetUserFavorites(int userId, int productId);
        void CreateUserFavorite(UserFavorites userFavorite);
        void DeleteUserFavorite(UserFavorites userFafvorite);
    }
}
