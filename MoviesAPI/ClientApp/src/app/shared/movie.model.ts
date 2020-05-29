export class Movie {
  Id: number;
  Title: string;
  Description: string;
  Genre: Genre;
  Duration: number;
  YearOfRelease: number;
  Director: string;
  DateAdded: string;
  Rating: number;
  Watched: boolean;
}


export enum Genre {
  Adventure  = 0,
  Comedy = 1,
  Horror = 2,
  SciFi = 3
}
