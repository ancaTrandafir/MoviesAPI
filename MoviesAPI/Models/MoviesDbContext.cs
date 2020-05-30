using Microsoft.EntityFrameworkCore;
using MoviesAPI.Models;
using MoviesAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Models
{
    // DbContext = Unit of Work
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options)
            : base(options)
        {
        }

        // DbSet = Repository
        // DbSet = O tabela din baza de date
        public DbSet<Movie> Movies{ get; set; }
        public DbSet<Comment> Comments{ get; set; }
        public DbSet<User> Users{ get; set; }

        // public DbSet<MovieGetModel> GetModelMovies { get; set; }
    }
}

