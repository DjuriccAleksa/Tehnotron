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
    [Route("api/users/{userId}/favorites")]
    [ApiController]
    [Authorize]
    public class UserFavoritesController : ControllerBase
    {
        private readonly IServiceManager _service;

        public UserFavoritesController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavoritesForUser(int userId)
        {
            var userFavoritess = await _service.UserFavoritesService.GetUserFavorites(userId);

            return Ok(userFavoritess);
        }

        [HttpGet("{productId:int}", Name = "CreatedUserFavorite")]
        public async Task<IActionResult> GetFavoriteProductForUser(int userId, int productId)
        { 
            var favorite = await _service.UserFavoritesService.GetUserFavorite(userId, productId);

            return Ok(favorite);
        }

        [HttpPost]
        public async Task<IActionResult> AddUserFavorite([FromBody] UserFavoriteCreateDTO userFavorite)
        {
            if (userFavorite is null)
                return BadRequest("User favorite for add is null");

            var userFavoriteDto = await _service.UserFavoritesService.CreateUserFavorite(userFavorite);

            return CreatedAtRoute("CreatedUserFavorite", new {userId = userFavorite.UserId, userFavorite.ProductId}, userFavoriteDto);
        }

        [HttpDelete("{productId:int}")]
        public async Task<IActionResult> DeleteFavoriteForUser(int userId, int productId)
        {
            await _service.UserFavoritesService.DeleteUserFavorite(userId, productId);

            return NoContent();
        }
    }
}
