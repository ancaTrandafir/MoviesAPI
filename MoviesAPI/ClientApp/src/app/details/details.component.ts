import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styles: []
})

export class DetailsComponent implements OnInit {

    public selectedMovie: Movie;

    constructor(private service: MovieService,
        private activatedRoute: ActivatedRoute,
        private location: Location) { }


    // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // https://angular.io/tutorial/toh-pt5

    ngOnInit(): void {

        //this.service.getMovieById()
        //    .subscribe(result => {
        //        this.selectedMovie = result;

        //        console.log("filmul selectat este " + this.selectedMovie.Title);

        //    }, error => console.error(error));


        //this.sub = this.activatedRoute.params.subscribe(params => {
        //    this.id = params['id'];
        //    let data = this.getMovieById();
        //    data.then((res) => {
        //        this.selectedMovie = res
        //    });
        //});

        this.getMovieById();

    }

   




    //async getMovieById() {
    //    try {
    //        let selectedMovie = await this.service.getMovieById(this.id);
    //        return selectedMovie;
    //    } catch (e) {
    //        console.log(e);
    //    }
    //}


    getMovieById(): void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log("id din  details " + id);
        this.service.getMovieById(id)
            .subscribe(m => this.selectedMovie = m);
        console.log("movie este " + this.selectedMovie);
    }

    // The route.snapshot is a static image of the route information shortly after the component was created.

    // The paramMap is a dictionary of route parameter values extracted from the URL.The "id" key returns the id of the hero to fetch.

    // Route parameters are always strings. The JavaScript(+) operator converts the string to a number, which is what a hero id should be.



    goBack(): void {
        this.location.back();
    }
}   




 








 
