using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Shared.DTOs;

namespace Tehnotron.Services.Contracts
{
    public interface IServiceUser
    {
        Task<IdentityResult> RegisterUser(UserRegisterDTO userRegister);
        Task<UserDTO> GetUserProfile(int id);
        Task<bool> ValidateUser(UserLoginDTO userForAuth);
        Task<string> CreateToken();
        Task UpdateUser(int userId, UserUpdateDTO userUpdate);

    }
}
