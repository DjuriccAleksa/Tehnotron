using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Interfaces;
using Tehnotron.Repository.Context;

namespace Tehnotron.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly TehnotronContext _context;

        public RepositoryBase(TehnotronContext context)
        {
            _context = context;
        }
        public void Create(T entity) => _context.Set<T>().Add(entity);

        public void Delete(T entity) => _context.Set<T>().Remove(entity);

        public IQueryable<T> GetAll() => _context.Set<T>();

        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> condition) => _context.Set<T>().Where(condition);

        public void Update(T entity) => _context.Set<T>().Update(entity);
    }
}
