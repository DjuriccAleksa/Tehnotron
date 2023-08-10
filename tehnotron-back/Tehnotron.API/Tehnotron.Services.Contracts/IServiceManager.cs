using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Services.Contracts
{
    public interface IServiceManager
    {
        IServiceUser UserService { get; }
        IServiceProduct ProductService { get; }
        IServiceCategory CategoryService { get; }
        IServiceUserFavorites UserFavoritesService { get; }
    }
}
