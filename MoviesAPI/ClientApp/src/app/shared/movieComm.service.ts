import { Injectable } from '@angular/core';
import { MovieComm } from './movieComm.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class MovieCommService {

    readonly rootURL = "https://localhost:44335";

    constructor(private http: HttpClient) {}



    getMovieById(id) {
        console.log("id este " + id);
        return this.http.get<MovieComm>(this.rootURL + '/movies/' + id)
         
    }

}
