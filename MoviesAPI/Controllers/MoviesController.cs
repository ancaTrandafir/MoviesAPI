using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Movies.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Movies;
using MoviesAPI.ViewModels;
using Microsoft.AspNetCore.Http;

namespace HotelMng.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {

        private readonly MoviesDbContext _context;


        public MoviesController(MoviesDbContext context)
        {
            _context = context;

        }


        /// <summary>
        /// Retrieves a list of all movies from DB.
        /// </summary>
        /// <returns>List of movies</returns>
        // GET: movies
        [HttpGet]
        public IEnumerable<MovieGetModel> GetReservations()     // get de view model care are nr de comm
        {
            IQueryable<Movie> result = _context.Movies
                                        .Include(m => m.Comments);

            return result.Select(m => MovieGetModel.GetMovieModel(m)); 
        }




        //// GET: movie/5
        //[HttpGet("{id}")]
        //public async Task<List<Comment>> GetComments(long id)
        //{

        //    var movie = await _context.Movies
        //          .Include(m => m.Comments)     // se incarca proprieteatea movie.Comment

        //          .AsNoTracking()
        //          .FirstOrDefaultAsync(m => m.ID == id);

        //    List<Comment> ListOfComments= new List<Comment>();
        //    var comments = from c in _context.Comments
        //                       where movie.ID == c.MovieID
        //                       select c;

        //    foreach (var comm in comments)
        //    {
        //        ListOfComments.Add(comm);
        //    }

        //    return ListOfComments;
        //}





        /// <summary>
        /// Retrieves a specific movie by id, list of its comments included.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the movie specified by id and its list of comments.</returns>
        // GET: movies/5
        [HttpGet("{id}")]
        public Movie GetMovieById(long id)
        {

            var movie = _context.Movies
                  .Include(m => m.Comments)     // se incarca proprieteatea movie.Comment       
                  .FirstOrDefault(m => m.ID == id);

            // JsonException: A possible object cycle was detected which is not supported. 
            // This can either be due to a cycle or if the object depth is larger than the maximum allowed depth of 32.
            // Solution: Microsoft.AspNetCore.Mvc.NewtonsoftJson din Nugget; add service in StartUp

            return movie;
         }



        /// <summary>
        /// Retrieves filtered movies, added between certain dates, also alphabetically ordered.
        /// </summary>
        /// <remarks>
        /// Sample URL request:
        ///    https://localhost:44335/movies/filter?$from=2020-05-15T00:00:00&to=2020-05-17T00:00:00
        /// Sample parameter: yyyy-MM-dd   
        /// </remarks>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns>A list of movies with dateAdded between the two specified dates.</returns>
        // GET: movies/filter?from=a&to=b
        [HttpGet("filter")]
        public IEnumerable<Movie> GetFilteredMovies(String from, String to)
        {
            DateTime fromDate = Convert.ToDateTime(from);
            DateTime toDate = Convert.ToDateTime(to);

            // LINQ
            // https://stackoverflow.com/questions/58166970/migrating-from-ef-core-2-to-ef-core-3
            var results = _context.Movies.AsEnumerable()
                .Where(o => (DateTime.Parse(o.DateAdded) > fromDate) && (DateTime.Parse(o.DateAdded) < toDate));
                
            //var sortedResultsByYearOfRelease = results.OrderBy(o => o.YearOfRelease);

            //  return sortedResultsByYearOfRelease;  // type IOrderedQueryable
            return results.OrderBy(m => m.YearOfRelease);
        }


      




    /// <summary>
    /// Edit any properties of a specific movie you mention by id.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="movie"></param>
    /// <returns></returns>
            // PUT: movie/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(long id, Movie movie)
        {
            if (id != movie.ID)
            {
                return BadRequest();
            }

            if (!MovieExists(id))
            {
                return NotFound();
            }

            _context.Entry(movie).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(movie);
        }





        /// <summary>
        /// Creates a new movie.
        /// </summary>
        /// <param name="movie"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Movies
        ///      {
        ///         "id": "3",
        ///         "dateAdded": "2019-04-05",
        ///         "description": "Frodo",
        ///         "director": "Steven Spielberg",
        ///         "duration": "120",
        ///         "rating": "10",
        ///         "title": "Stapanul inelelor3",
        ///         "watched": "True",
        ///         "yearOfRelease": "2000"
        ///       }
        ///
        /// </remarks>
        /// <param name="movie"></param>
        /// <returns>A newly created movie</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response> 
        // POST: /movie
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostMovie(Movie movie)
        {

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetMovie", new { id = movie.ID }, movie);
            //  return Ok(movie);
        }





        /// <summary>
        /// Deletes the movie tou specify by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the movie deleted.</returns>
        // DELETE: /5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(long id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            _context.Entry(movie).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            return movie;
        }



        private bool MovieExists(long id)
        {
            return _context.Movies.Any(e => e.ID == id);
        }











    }
}

