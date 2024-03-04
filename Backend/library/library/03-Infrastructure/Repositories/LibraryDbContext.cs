using library._01_Domain.Entities;
using library._03_Infrastructure.Config;
using Microsoft.EntityFrameworkCore;

namespace library._03_Infrastructure.Repositories
{
    public class LibraryDbContext : DbContext
    {
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Subject>()
        //        .HasKey(l => l.id);

        //    modelBuilder.Entity<Subject>()
        //        .Property(l => l.name)
        //        .IsRequired();

        //    modelBuilder.Entity<Subject>()
        //        .HasMany(l => l.children)
        //        .WithOne(l => l.parent)
        //        .HasForeignKey(l => l.parentId)
        //        .OnDelete(DeleteBehavior.Restrict);
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subject>()
                .HasOne(s => s.parent)
                .WithMany(s => s.children)
                .HasForeignKey(s => s.parentId)
                .IsRequired(false);

            base.OnModelCreating(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer("server=.;database=LibraryDb;trusted_connection=true;TrustServerCertificate=True", options => options.EnableRetryOnFailure());
        }
        public DbSet<User> users { get; set; }
        public DbSet<Book> books { get; set; }
        public DbSet<Subject> subjects { get; set; }
    }
}
