using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Interfaces;
using Tehnotron.Repository.Context;

namespace Tehnotron.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly TehnotronContext _context;
        private readonly Lazy<IRepositoryUser> _repositoryUser;
        private readonly Lazy<IRepositoryProduct> _repositoryProduct;
        private readonly Lazy<IRepositoryCategory> _repositoryCategory;
        private readonly Lazy<IRepositoryUserFavorites> _repositoryUserFavorites;


        public RepositoryManager(TehnotronContext context)
        {
            _context = context;
            _repositoryUser = new Lazy<IRepositoryUser>(() => new RepositoryUser(context));
            _repositoryProduct = new Lazy<IRepositoryProduct>(() => new RepositoryProduct(context));
            _repositoryCategory = new Lazy<IRepositoryCategory>(() => new RepositoryCategory(context));
            _repositoryUserFavorites = new Lazy<IRepositoryUserFavorites>(() => new RepositoryUserFavorites(context));

        }
        public IRepositoryUser User => _repositoryUser.Value;

        public IRepositoryProduct Product => _repositoryProduct.Value;

        public IRepositoryCategory Category => _repositoryCategory.Value;

        public IRepositoryUserFavorites UserFavorites => _repositoryUserFavorites.Value;

        public async Task Save() => await _context.SaveChangesAsync();
    }
}
