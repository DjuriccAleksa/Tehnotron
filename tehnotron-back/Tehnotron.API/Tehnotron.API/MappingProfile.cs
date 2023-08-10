using AutoMapper;
using Tehnotron.Entities.Models;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>()
                .ReverseMap();
            CreateMap<Product, ProductDTO>()
                .ReverseMap();
            CreateMap<ProductCreateDTO, Product>()
                .ForMember(p => p.ThumbnailImage, opt => opt.MapFrom(src => src.ThumbnailImage))
                .ForMember(p => p.Images, opt => opt.MapFrom(src => src.Images))
                .ReverseMap();
            CreateMap<UserFavorites, UserFavoriteDTO>();
            CreateMap<UserFavoriteCreateDTO, UserFavorites>();

            CreateMap<UserRegisterDTO, User>();
            CreateMap<UserUpdateDTO, User>();
            CreateMap<User, UserDTO>();
        }
    }
}
