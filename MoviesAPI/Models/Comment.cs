using MoviesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Models
{
    public class Comment
    {

        public int Id { get; set; }
        public long MovieID { get; set; } // foreign key, corresponding navigation property is Movie
        public string Text { get; set; }
        public bool Important { get; set; }
        public Movie Movie { get; set; }
        public User AddedBy { get; set; }

    }
}
