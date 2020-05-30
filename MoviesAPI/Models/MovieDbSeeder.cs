using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Movies.Helpers;
using MoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Models
{
    public static class MovieDbSeeder
    {
        //
      public static void Initialize(MoviesDbContext context)
       // public static void Initialize(IServiceProvider serviceProvider)

        {
             context.Database.EnsureCreated();
					
					//Look for any users.
			  if (!context.Users.Any())
                {
                    context.Users.Add(new User
                    {
                        FirstName = "Anca",
                        LastName = "Trandafir",
                        Username = "anka",
                        Password = HashUtils.GetHashString("parola")
                    });
                    context.SaveChanges();
                }
			 
                // Look for any movies
                // If there are any movies in the DB, the seed initializer returns and no movies are added.
                if (context.Movies.Any())
            {
                return;     // DB has been seeded
            }

            context.Movies.AddRange(
                new Movie
                {
                    Title = "Stapanul inelelor",
                    Description = "Fight between good and evil",
                    Genre = 0,
                    Duration = 120,
                    YearOfRelease = 2010,
                    Director = "Steven Spielberg",
                    DateAdded = DateTime.Now,
                    Rating = 10,
                    Watched = false
                },

                new Movie
                {
                    Title = "Superman",
                    Description = "Fight between good and evil",
                    Genre = 0,
                    Duration = 120,
                    YearOfRelease = 1970,
                    Director = "Ronald Figgure",
                    DateAdded = DateTime.Now,
                    Rating = 10,
                    Watched = true
                }
                );

            context.SaveChanges();  // commit transaction
          
        }
    }

}
