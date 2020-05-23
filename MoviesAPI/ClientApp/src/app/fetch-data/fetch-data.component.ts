import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

    public movies: Movie[];
    readonly rootURL = "https://localhost:44335";


    constructor(private http: HttpClient) {

        http.get<Movie[]>(this.rootURL + '/movies').subscribe(result => {
            this.movies = result;
        }, error => console.error(error));
    }


 

}



interface Movie {
    ID: number;
    Title: string;
    Description: string;
    Genre: Genre;
    Duration: number;
    YearOfRelease: number;
    Director: string;
    DateAdded: string;
    Rating: number;
    Watched: boolean;
    NumberOfComments: number;
}

enum Genre {
    Adventure = 0,
    Comedy = 1,
    Horror = 2,
    SciFi = 3
}
