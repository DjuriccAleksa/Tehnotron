using AutoMapper;
using CloudinaryDotNet;
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
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services
{
    public class ServiceProduct : IServiceProduct
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public ServiceProduct(IRepositoryManager repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repository = repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
                );

            _cloudinary = new Cloudinary( acc );
        }

        public async Task<ProductDTO> CreateProduct(ProductCreateDTO product)
        {
            var thumbnailUploadResult = await ServiceCloudinary.UploadToCloudinary(product.ThumbnailImage, _cloudinary);
            if (thumbnailUploadResult.Error != null)
                throw new Exception("Error in cloudinary thumb image");

            var thumbnailUrl = thumbnailUploadResult.Url.ToString();

            var imagesUrls = new List<string>();

            if(product.Images != null)
            {
                imagesUrls.Add(thumbnailUrl);

                foreach (var image in product.Images)
                {
                    var imgUploadResult = await ServiceCloudinary.UploadToCloudinary(image, _cloudinary);
                    if (imgUploadResult.Error != null)
                        throw new Exception("Error in cloudinary images");

                    imagesUrls.Add(imgUploadResult.Url.ToString());
                }
            }

            var productToSave = new Product
            {
                Title = product.Title,
                Description = product?.Description,
                CategoryId = product.CategoryId,
                UserId = product.UserId,
                ThumbnailImage = thumbnailUrl,
                Images = imagesUrls?.ToArray(),
                Price = product.Price,
            };

            _repository.Product.CreateProduct(productToSave);
            await _repository.Save();

            var productToReturn = _mapper.Map<ProductDTO>(productToSave);
            return productToReturn;
        }

        public async Task<IEnumerable<ProductDTO>> GetAllProducts()
        {
            var productsFromDb = await _repository.Product.GetAllProducts();

            var productsToReturn = _mapper.Map<IEnumerable<ProductDTO>>(productsFromDb);

            return productsToReturn;

        }
        public async Task<IEnumerable<ProductDTO>> GetProductsForUser(int id)
        {
            var user = await _repository.User.GetUserById(id);
            if (user is null)
                throw new Exception($"User with id {id} doesn't exist.");

            var products = await _repository.Product.GetAllProductsForUser(id);

            var productsToReturn = _mapper.Map<IEnumerable<ProductDTO>>(products);

            return productsToReturn;
        }

        public async Task<ProductDTO> GetProductById(int id)
        {
            var product = await _repository.Product.GetProduct(id);

            if (product is null)
                throw new Exception($"Product with id: {id} doesn't exist");

            var productDto = _mapper.Map<ProductDTO>(product);
            return productDto;
        }

        public async Task DeleteProduct(int id)
        {
            var product = await _repository.Product.GetProduct(id);
            if (product is null)
                throw new Exception($"Product with id: {id} doesn't exist");

            _repository.Product.DeleteProduct(product);

            await _repository.Save();
        }
    }

}
