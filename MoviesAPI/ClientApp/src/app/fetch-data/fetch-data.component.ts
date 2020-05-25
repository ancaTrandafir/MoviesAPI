import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';


@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {

    public movies: Movie[];
    readonly rootURL = "https://localhost:44335";



    constructor(private service: MovieService) { }

    ngOnInit() {

        this.service.getMovies()
            .subscribe(data => this.movies = data);
    }


   



}

