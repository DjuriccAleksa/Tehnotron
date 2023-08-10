using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Interfaces
{
    public interface IRepositoryManager
    {
        IRepositoryUser User { get; }
        IRepositoryProduct Product { get; }
        IRepositoryCategory Category { get; }
        IRepositoryUserFavorites UserFavorites { get; }

        Task Save();
    }
}
