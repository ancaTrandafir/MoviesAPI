using FluentValidation;
using Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.ModelValidator
{
	public class CommentValidator : AbstractValidator<Comment>
	{
		public CommentValidator(MoviesDbContext context)
		{
			RuleFor(x => x.MovieID).NotEmpty();

			RuleFor(x => x.Text).NotEmpty()
				.MinimumLength(3)
				.MaximumLength(200);


		}
	}
}


