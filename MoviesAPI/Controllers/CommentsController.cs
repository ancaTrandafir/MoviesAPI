using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Movies.Models;

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

        // GET: Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }






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

        // PUT: api/Comments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
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

        // POST: api/Comments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
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







        //// GET: /getCommByMovie/?idMovie=a
        //[HttpGet("getCommByMovie")]
        //public List<Comment> GetCommentsForMovie(long idMovie)
        //{
        //    var comments = (from m in _context.Movies
        //                    where m.ID == idMovie
        //                    select m.Comments)
        //               .ToList();
        //    return comments;
        //}


        //// GET: /getCommByMovie/?idMovie=a&idComment=b
        //[HttpGet("getCommByMovie")]
        //public System.Linq.IQueryable<Comment> GetCommentsForMovie(long idMovie, long idComment)
        //{

        //    var com = from movie in _context.Movies
        //              where movie.ID == idMovie
        //              join comment in _context.Comments
        //                                where comment.Id == idComment
        //              select comment;
        //    return com;
        //}
    }
}
