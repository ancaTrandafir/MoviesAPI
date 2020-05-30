using Movies.Models;
using MoviesAPI.Models;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Movies.Models
{

    public enum Genre
    {
        [EnumMember]        // using System.Runtime.Serialization
        Adventure,
        Comedy,
        Horror,
        SciFi
    }


    public class Movie
    {
        public long Id { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string Title { get; set; }

        [StringLength(150, MinimumLength = 3)]
        public string Description { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]        // using Newtonsoft Json Converters
        public Genre Genre { get; set; }

        public int Duration { get; set; }

        [Range(1900, 2020)]
        public int YearOfRelease { get; set; }

        [StringLength(30, MinimumLength = 3)]
        public string Director { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateAdded { get; set; }

        [Range(1, 10)]
        public int Rating { get; set; }

        public bool Watched { get; set; }

        [JsonIgnore]
        public List<Comment> Comments { get; set; }

        public User AddedBy { get; set; }
    }

}
