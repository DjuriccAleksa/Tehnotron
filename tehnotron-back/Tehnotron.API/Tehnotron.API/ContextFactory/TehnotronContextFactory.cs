using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Tehnotron.Repository.Context;

namespace Tehnotron.API.ContextFactory
{
    public class TehnotronContextFactory : IDesignTimeDbContextFactory<TehnotronContext>
    {
        public TehnotronContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json")
                        .Build();

            var builder = new DbContextOptionsBuilder<TehnotronContext>()
                .UseSqlServer(configuration.GetConnectionString("default"),
                b => b.MigrationsAssembly("Tehnotron.API"));

            return new TehnotronContext(builder.Options);
        }
    }
}
