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

    previousPage: string;
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



    resetForm(form?: NgForm) {    // form? parametrul poate fi null
    
        if (form != null) {
    
            console.log(this.idCopied);
            form.form.reset();  // form.reset() -> all desccendents are marked pristine and untouched and values are null
        }
        else
            this.service.formData = {  // initialize model property
            Id: 0,
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
        if (form.value.Id == 0)
            this.insertRecord(form);    // 0 e insert!!!!
        else  // update
            this.updateRecord(form); // daca e undefined e update

    }




    insertRecord(form: NgForm) {  // POST request on submit
        this.service.postMovie()
            .subscribe(   // // Call subscribe() to start listening for updates.

                response => {    // if POST operation succeeds we set the form to initial values
                    console.log("successfully added");
                    this.resetForm(form);
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },
                error => {
                    console.log(error)
                })
     
     
    }






    updateRecord(form: NgForm) {  // PUT request on submit

        console.log(form);
        this.service.updateMovie(form.value) // ID
            .subscribe(   // // Call subscribe() to start listening for updates.

                response => {    // if PUT operation succeeds we set the form to initial values
                    console.log("successfully updated");
                    this.resetForm(form);
                    this.service.getMovies(); // refresh la lista;
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }


    autofillFormForUpdate() {
        this.service.formData.Id = this.service.idCopied;   // reatribui valoarea id din fetch-data cand l-am selectat, pt ca acum este undefined
        console.log(this.service.formData.Id);
        this.service.formData;
        console.log(this.service.formData);
        
    }




}
