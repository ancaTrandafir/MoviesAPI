import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';     // Event Emitter pt submit reactive form
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Movie } from '../shared/movie.model';



@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styles: []
})




export class AddMovieComponent implements OnInit {

    idCopied: number;
    movieReactiveForm: FormGroup;

    get Title() {
        return this.movieReactiveForm.get('Title');
    }

    get Description() {
        return this.movieReactiveForm.get('Description');
    }

    get Genre() {
        return this.movieReactiveForm.get('Genre');
    }

    get Duration() {
        return this.movieReactiveForm.get('Duration');
    }

    get YearOfRelease() {
        return this.movieReactiveForm.get('YearOfRelease');
    }

    get Director() {
        return this.movieReactiveForm.get('Director');
    }

    get DateAdded() {
        return this.movieReactiveForm.get('DateAdded');
    }

    get Rating() {
        return this.movieReactiveForm.get('Rating');
    }

    get Watched() {
        return this.movieReactiveForm.get('Watched');
    }



    // Form state
    loading = false;
    success = false;




    constructor(public service: MovieService,
        private location: Location,
        private fb: FormBuilder
    ) { }






    ngOnInit() {


        this.movieReactiveForm = this.fb.group({
            Title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            Description: ['', [Validators.required]],
            Genre: ['', [Validators.required]],
            Duration: ['', [Validators.required]],
            YearOfRelease: ['', [Validators.required, Validators.min(1900), Validators.max(2020)]],
            Director: ['', [Validators.required]],
            DateAdded: ['', [Validators.required]],         // ar trebui custom validator pt dateAdded < Date.now
            Rating: ['', [Validators.required]],
            Watched: ['', [Validators.required]]
        });
    

            this.resetForm();   // initialize model property  
    }






  
    onSubmit(form) {

        this.movieReactiveForm = form;  // form transmis ca parametru din html
        this.service.formDataMovie = this.movieReactiveForm.value;  // service.formDataMovie ia valoarea form din html
      
        this.service.postMovie()
            // .subscribe(   // // Call subscribe() to start listening for updates.
            .toPromise()
            .then(
                response => {    // if POST operation succeeds we set the form to initial values
                    console.log("successfully added");
                    this.resetForm();
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },
                error => {
                    console.log(error)
                })

    }




    resetForm() {
        this.service.formDataMovie = {  // initialize model property
                        Id: 0,
                        Title: '',
                        Description: '',
                        Genre: null,
                        Duration: null,
                        YearOfRelease: null,
                        Director: '',
                        DateAdded: '',
                        Rating: null,
                        Watched: null
                    }
           
    }




}
