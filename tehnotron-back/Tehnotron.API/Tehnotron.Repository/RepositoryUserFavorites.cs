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
    public class RepositoryUserFavorites : RepositoryBase<UserFavorites>, IRepositoryUserFavorites
    {
        public RepositoryUserFavorites(TehnotronContext context) : base(context)
        {
        }

        public void CreateUserFavorite(UserFavorites userFavorite) => Create(userFavorite);

        public void DeleteUserFavorite(UserFavorites userFafvorite) => Delete(userFafvorite);

        public async Task<IEnumerable<UserFavorites>> GetAllUserFavorites(int id) => await GetByCondition(uf => uf.UserId == id)
            .Include(uf => uf.Product)
            .ToListAsync();

        public async Task<UserFavorites> GetUserFavorites(int userId, int productId) => await GetByCondition(uf => uf.UserId == userId && uf.ProductId == productId)
            .SingleOrDefaultAsync();
    }
}
