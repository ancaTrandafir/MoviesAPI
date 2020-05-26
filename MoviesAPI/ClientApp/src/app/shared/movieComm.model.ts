import { Genre } from "./movie.model";
import { Comment } from "./comment.model";

export class MovieComm {
  Id: number;
  Title: string;
  Description: string;
  Genre: Genre;
  Duration: number;
  YearOfRelease: number;
  Director: string;
  DateAdded: string;
  Watched: boolean;
  Comments: Comment;
}



