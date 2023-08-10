using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tehnotron.Entities.Models
{
    public class UserDb : IdentityUser
    {
        public string FullName { get; set; }
        
    }
}
