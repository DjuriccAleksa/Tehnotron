using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Services.Contracts;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Presentation.Controllers
{
    [Route("api/products")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ProductsController(IServiceManager service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _service.ProductService.GetAllProducts();

            return Ok(products);
        }

        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _service.ProductService.GetProductById(id);

            return Ok(product);
        }

        [HttpGet("user/{id:int}")]
        public async Task<IActionResult> GetProductsForUser(int id)
        {
            var products = await _service.ProductService.GetProductsForUser(id);
            return Ok(products);
        }


        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateProduct([FromForm]ProductCreateDTO productCreate)
        {
            if (productCreate == null)
                return BadRequest("Product for creation is null");

            var product = await _service.ProductService.CreateProduct(productCreate);

            return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _service.ProductService.DeleteProduct(id);

            return NoContent();
        }
    }
}
