using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;
using Tehnotron.Interfaces;
using Tehnotron.Repository.Context;

namespace Tehnotron.Repository
{
    public class RepositoryUser : RepositoryBase<User>, IRepositoryUser
    {
        public RepositoryUser(TehnotronContext context) : base(context)
        {
            
        }

        public void CreateUser(User user) => Create(user);
        

        public Task GetUser(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserById(int id) => await GetByCondition(u => u.Id == id).SingleOrDefaultAsync();
    }
}
