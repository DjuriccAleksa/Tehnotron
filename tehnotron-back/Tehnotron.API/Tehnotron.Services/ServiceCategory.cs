using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Interfaces;
using Tehnotron.Services.Contracts;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services
{
    public class ServiceCategory : IServiceCategory
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public ServiceCategory(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDTO>> GetCategories()
        {
            var categories = await _repository.Category.GetAllCategories();

            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryDTO>>(categories);

            return categoriesToReturn;
            
        }
    }
}
