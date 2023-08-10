using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Shared.DTOs
{
    public record UserRegisterDTO(string Fullname, string UserName, string Email, string Password, string? PhoneNumber);
}
