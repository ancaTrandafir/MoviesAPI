import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styles: []
})
export class AddMovieComponent implements OnInit {

    constructor(public service: MovieService,
                private location: Location) { }

    ngOnInit() {
        this.resetForm();   // initialize model property
    }



    resetForm(form?: NgForm) {    // form? parametrul poate fi null

        if (form != null)
            form.form.reset();  // form.reset() -> all desccendents are marked pristine and untouched and values are null

        this.service.formData = {  // initialize model property
            ID: 0,
            Title: '',
            Description: '',
            Genre: 0,
            Duration: 0,
            YearOfRelease: 0,
            Director: '',
            DateAdded: '',
            Watched: true
        }
    }




  
    onSubmit(form: NgForm) {

        // facem diferenta intre Post si PUT verificand ID; undefined sau 0
        if (form.value.ID == 0)
            this.updateRecord(form);
        else  // update
            this.insertRecord(form);

    }




    insertRecord(form: NgForm) {  // POST request on submit
        this.service.postMovie();
        this.service.getMovies();
        this.location.back();
        console.log("titlu" + form.value.Title);
     
    }






    updateRecord(form: NgForm) {  // PUT request on submit

        this.service.updateMovie(form.value) // ID
            .subscribe(   // // Call subscribe() to start listening for updates.

                response => {    // if PUT operation succeeds we set the form to initial values
                    this.resetForm(form);
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }



}
