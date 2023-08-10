using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tehnotron.Entities.Models;

namespace Tehnotron.Repository.Context
{
    public class TehnotronContext : IdentityDbContext<User, IdentityRole<int>,int>
    {
        public TehnotronContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserFavorites> Favorites { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .Property(p => p.Images)
                .HasConversion(
                i => string.Join(',', i),
                i => i.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<UserFavorites>()
                 .HasKey(uf => new { uf.UserId, uf.ProductId });

            modelBuilder.Entity<UserFavorites>()
                .HasOne(uf => uf.User)
                .WithMany(u => u.FavoriteProducts)
                .HasForeignKey(uf => uf.UserId)
                .OnDelete(DeleteBehavior.NoAction);
                
        }

    }
}
