export class Movie {
  ID: number;
  Title: string;
  Description: string;
  Genre: Genre;
  Duration: number;
  YearOfRelease: number;
  Director: string;
  DateAdded: string;
  Watched: boolean;
}


export enum Genre {
  Adventure,
  Comedy,
  Horror,
  SciFi
}
