using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;
using Tehnotron.Interfaces;
using Tehnotron.Services.Contracts;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services
{
    public class ServiceUser : IServiceUser
    {
        //private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        private User? _user;

        public ServiceUser(IMapper mapper, UserManager<User> userManager, IConfiguration configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> CreateToken()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();

            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("KEYSECRET"));
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim("Id", _user.Id.ToString()),
                new Claim("Name", _user.UserName),
                new Claim("Email", _user.Email),
            };

            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var tokenOptions = new JwtSecurityToken
            (
            issuer: jwtSettings["validIssuer"],
            audience: jwtSettings["validAudience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expires"])),
            signingCredentials: signingCredentials
            );
            return tokenOptions;
        }

        public async Task<IdentityResult> RegisterUser(UserRegisterDTO userRegister)
        {
            var user = _mapper.Map<User>(userRegister);
            var result = await _userManager.CreateAsync(user,
            userRegister.Password);

            return result;
        }

        public async Task<bool> ValidateUser(UserLoginDTO userForAuth)
        {
            _user = await _userManager.FindByNameAsync(userForAuth.Username);

            var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuth.Password));

            return result;
        }

        public async Task UpdateUser(int userId, UserUpdateDTO userUpdate)
        {
            _user = await _userManager.FindByIdAsync(userId.ToString());
            if (_user == null)
                throw new Exception("User with that id doesn't exist");
            _mapper.Map(userUpdate, _user);

            await _userManager.UpdateAsync(_user);
        }        

        public async Task<UserDTO> GetUserProfile(int id)
        {
            _user = await _userManager.FindByIdAsync(id.ToString());

            if (_user == null)
                throw new Exception("User with that id doesn't exist");

            var userToReturn = _mapper.Map<UserDTO>(_user);

            return userToReturn;
        }
    }
}
