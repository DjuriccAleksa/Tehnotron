using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;
using Tehnotron.Interfaces;
using Tehnotron.Services.Contracts;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services
{
    public class ServiceUserFavorites : IServiceUserFavorites
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public ServiceUserFavorites(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<UserFavoriteDTO> CreateUserFavorite(UserFavoriteCreateDTO userFavoriteCreate)
        {
            var userFavoriteToSave = _mapper.Map<UserFavorites>(userFavoriteCreate);

            _repository.UserFavorites.CreateUserFavorite(userFavoriteToSave);
            await _repository.Save();

            userFavoriteToSave.Product = await _repository.Product.GetProduct(userFavoriteToSave.ProductId);

            var userFavoriteToReturn = _mapper.Map<UserFavoriteDTO>(userFavoriteToSave);

            return userFavoriteToReturn;
        }

        public async Task DeleteUserFavorite(int userId, int favoriteId)
        {
            var userExist = await _repository.User.GetUserById(userId);
            if (userExist is null)
                throw new Exception($"User with id {userId} doesn't exist");

            var userFavorite = await _repository.UserFavorites.GetUserFavorites(userId, favoriteId);
            if (userFavorite is null)
                throw new Exception($"Product with id {favoriteId} is not on favorite list for user with id {userId}");

            _repository.UserFavorites.DeleteUserFavorite(userFavorite);
            await _repository.Save();
        }

        public async Task<ProductDTO> GetUserFavorite(int userId, int productId)
        {
            var userExist = await _repository.User.GetUserById(userId);
            if (userExist is null)
                throw new Exception($"User with id {userId} doesn't exist");

            var userFavorite = await _repository.UserFavorites.GetUserFavorites(userId, productId);
            if (userFavorite is null)
                throw new Exception($"Product with id {productId} is not on favorite list for user with id {userId}");

            var productDb = userFavorite.Product;
            var productDto = _mapper.Map<ProductDTO>(productDb);
            return productDto;
        }

        public async Task<IEnumerable<ProductDTO>> GetUserFavorites(int id)
        {
            var userExist = await _repository.User.GetUserById(id);
            if (userExist is null)
                throw new Exception($"User with id {id} doesn't exist");

            var userFavoritesDb = await _repository.UserFavorites.GetAllUserFavorites(id);
            var products = userFavoritesDb.Select(fav => fav.Product);

           var productsDto = _mapper.Map<IEnumerable<ProductDTO>>(products);

            return productsDto;
        }
    }
}
