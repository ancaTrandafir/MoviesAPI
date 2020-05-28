using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Movies.Models;
using MoviesAPI.ViewModels;

namespace MoviesAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly MoviesDbContext _context;

        public CommentsController(MoviesDbContext context)
        {
            _context = context;
        }




        //// GET: Comments
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        //{
        //    return await _context.Comments.ToListAsync();
        //}




        /// <summary>
        /// Retrives all comments from DB.
        /// </summary>
        /// <returns>A list of comments</returns>
        // GET: Comments
        [HttpGet]
        public IEnumerable<Comment> GetComments()
        {
            IQueryable<Comment> result = _context.Comments;

            return result;
        }





        /// <summary>
        /// Retrives the comment you specify by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>The comment with the given id.</returns>
        // GET: Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }





        /// <summary>
        /// Edit various properties of a comment you specify by its id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="comment"></param>
        /// <returns>Nn edited comment.</returns>
        // PUT: Comments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }




        /// <summary>
        /// Creates a new comment.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Comments
        ///          {
        ///            "movieID": 2,
        ///            "text": "Awesome",
        ///            "important": false
        ///           }
        ///
        /// </remarks>
        /// <param name="comment"></param>
        /// <returns>A newly created comment</returns>
        /// <response code="201">Returns the newly created item</response>
        /// <response code="400">If the item is null</response> 
        // POST: /
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }




        /// <summary>
        /// Deletes a specific comment.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns the comment deleted.</returns>
        // DELETE: /5
        // DELETE: Comments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }





        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }





    }
}
