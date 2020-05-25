using FluentValidation;
using Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.ModelValidator
{
    public class MovieValidator : AbstractValidator<Movie>
	{ 
		public MovieValidator(MoviesDbContext context)
		{
			RuleFor(x => x.Description).NotEmpty()
				.MinimumLength(3)
				.MaximumLength(100);
			RuleFor(x => x.Director).NotEmpty()
				.MinimumLength(3)
				.MaximumLength(20);
			RuleFor(x => x.DateAdded).NotEmpty();

			RuleFor(x => (x.DateAdded) < (DateTime.Now.Date));
		}

		
	}
}

