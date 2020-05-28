import { Injectable } from '@angular/core';
import { MovieComm } from './movieComm.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class MovieCommService {

    readonly rootURL = "https://localhost:44335";
    selectedMovie: MovieComm

    constructor(private http: HttpClient) { }



    getMovieById(id) {              // Use Promise, not Subscribe
        console.log("id este " + id);
        return this.http.get<MovieComm>(this.rootURL + '/movies/' + id);
            //.toPromise()
            //.then(response => {
            //    this.selectedMovie = response as MovieComm;
            //});


        //.subscribe(m => {                     // Nu merge pt ca returneaza un rezultat asincron care va fi undefined mai tarziu pt ca procesarea merge in conitnuare pana sa imi returneaze mie movie
        //    this.selectedMovie = m;                   // Subscribe nu este bun, dar Promise este pt ca returneaza Observable si asta imi trebuie.
        //    console.log(this.selectedMovie);
        //});


    }
}
