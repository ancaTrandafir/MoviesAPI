import { Component, OnInit } from '@angular/core';
import { MovieComm } from '../shared/movieComm.model';
import { MovieCommService } from '../shared/movieComm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styles: []
})

export class DetailsComponent implements OnInit {

    public selectedMovie: MovieComm;

    constructor(private service: MovieCommService,   // importam service-ul care include si proprietatea Comments in Movie
        private activatedRoute: ActivatedRoute,
        private location: Location) { }


    // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // https://angular.io/tutorial/toh-pt5

    ngOnInit(): void {

        this.getMovieById();

    }



    getMovieById(): void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log("id din  details " + id);
        this.service.getMovieById(id) 
            .subscribe(m => this.selectedMovie = m);

        console.log(this.selectedMovie);
        
    }

    // The route.snapshot is a static image of the route information shortly after the component was created.

    // The paramMap is a dictionary of route parameter values extracted from the URL.The "id" key returns the id of the hero to fetch.

    // Route parameters are always strings. The JavaScript(+) operator converts the string to a number, which is what a hero id should be.



    goBack(): void {
        this.location.back();
    }
}   




 








 
