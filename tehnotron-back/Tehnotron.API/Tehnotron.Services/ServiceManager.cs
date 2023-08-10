using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Cloudinary;
using Tehnotron.Entities.Models;
using Tehnotron.Interfaces;
using Tehnotron.Services.Contracts;

namespace Tehnotron.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IServiceUser> _userService;
        private readonly Lazy<IServiceProduct> _productService;
        private readonly Lazy<IServiceCategory> _categoryService;
        private readonly Lazy<IServiceUserFavorites> _userFavoritesService;
        private readonly UserManager<User> userManager;

        public ServiceManager(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager, IConfiguration configuration, IOptions<CloudinarySettings> cloudinarySettings)
        {
           _userService = new Lazy<IServiceUser>(() => new ServiceUser(mapper, userManager, configuration));
            _productService = new Lazy<IServiceProduct>(() => new ServiceProduct(repository, mapper, cloudinarySettings));
            _categoryService = new Lazy<IServiceCategory>(() => new ServiceCategory(repository, mapper));
            _userFavoritesService = new Lazy<IServiceUserFavorites>(() => new ServiceUserFavorites(repository, mapper));
            this.userManager = userManager;
        }

        public IServiceUser UserService => _userService.Value;

        public IServiceProduct ProductService => _productService.Value;

        public IServiceCategory CategoryService => _categoryService.Value;

        public IServiceUserFavorites UserFavoritesService => _userFavoritesService.Value;
    }
}
