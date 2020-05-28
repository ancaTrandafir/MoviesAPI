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

    idCopied: number;

    constructor(public service: MovieService,
                private location: Location
    ) { }





    ngOnInit() {
   
        if (this.service.updateBtnMovieClicked == true) // daca s-a apasat butonul de Update
            this.autofillFormForUpdate();

        else 
            this.resetForm();   // initialize model property  
       }






    resetForm(formMovie?: NgForm) {    // form? parametrul poate fi null


        if (formMovie != null) {
            console.log(this.idCopied);
            formMovie.form.reset();  // form.reset() -> all desccendents are marked pristine and untouched and values are null
           
        }

        
            this.service.formDataMovie = {  // initialize model property
                Id: 0,
                Title: '',
                Description: '',
                Genre: null,
                Duration: null,
                YearOfRelease: null,
                Director: '',
                DateAdded: '',
                Watched: null
            }
        this.service.updateBtnMovieClicked = false;   // resetez la false, altfel ramane marcat ca apasat
        this.service.formDataMovie.Id = 0; // il fac explicit 0 pt ca ramane suprascris cu id movie updatat anterior din cauza apelului  autofillFormForUpdate()  daca am apucat sa fac inainte update
    }   






  
    onSubmit(formMovie: NgForm) {

        // facem diferenta intre Post si PUT verificand ID; undefined sau 0
        if (this.service.formDataMovie.Id == 0)
       // if (formMovie.value.Id == 0 && this.service.updateBtnMovieClicked == false)     // nu e apasat butonul de update
            this.insertRecord(formMovie);    // 0 e insert!!!!

        else  // update
        { 
            this.updateRecord(formMovie); // daca e undefined e update
            formMovie.form.reset();  // form.reset() -> all desccendents are marked pristine and untouched and values are null
            this.service.updateBtnMovieClicked == false   // il resetez la false ca altfel ramane parcat ca true daca am apucat sa fac update inainte
        }
    }









    insertRecord(formMovie: NgForm) {  // POST request on submit
        this.service.postMovie()
           // .subscribe(   // // Call subscribe() to start listening for updates.
            .toPromise()
            .then(
                response => {    // if POST operation succeeds we set the form to initial values
                    console.log("successfully added");
                    this.resetForm(formMovie);
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },
                error => {
                    console.log(error)
                })
     
     
    }









    updateRecord(formMovie: NgForm) {  // PUT request on submit

        console.log(formMovie);
        this.service.updateMovie(formMovie.value) // ID
            //  .subscribe(   // // Call subscribe() to start listening for updates.
            .toPromise()
            .then(
                response => {    // if PUT operation succeeds we set the form to initial values
                    console.log("successfully updated");
                    this.resetForm(formMovie);
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }






    autofillFormForUpdate() {
        this.service.formDataMovie.Id = this.service.idCopied;   // reatribui valoarea id din fetch-data cand l-am selectat, pt ca acum este undefined
        console.log(this.service.formDataMovie.Id);
        this.service.formDataMovie;
        console.log(this.service.formDataMovie);
        
    }




}
