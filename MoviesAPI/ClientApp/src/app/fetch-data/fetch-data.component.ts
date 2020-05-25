import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {

    public movies: Movie[];
    public filteredMovies: Movie[];
    readonly rootURL = "https://localhost:44335";
    submitPressed = false;


    constructor(private service: MovieService) { }

    ngOnInit() {
        this.resetForm();
    }



    onSubmit(form: NgForm) {
        this.submitPressed = true; // inseamna  ca s-a accesat input-ul de filter si returnam filteredMovies
        this.getFilteredMoviesByDate(form);
    
    }


    resetForm(form?: NgForm) {    // form? parametrul poate fi null
        if (this.submitPressed == false)
            this.getAllMovies();
        else 
            this.getFilteredMoviesByDate(form);  // s-a apasat submit, deci fac filter
    }



    // in acelasi tabel afisez fie toate filmele, fie pe cele filtrate
    // diferenta o face o variabila submitPressed care initial este false si isi schimba valoarea daca se apasa submit

    getAllMovies() {
        this.service.getMovies()
            .subscribe(data => this.movies = data);
        console.log("toate filmele " + this.movies);
    }

    getFilteredMoviesByDate(form: NgForm) {
        this.service.filterMoviesByDate(form.value.from, form.value.to)     //form.value.
            .subscribe(data => this.movies = data);
        console.log("filter");
        console.log(this.movies);
    }


    // update
    populateForm(movie: Movie)  // populam form cu movie selectat si incarcat din server
    {                           // form data este proprietatea din service referitoare la form

        // this.service.formData = movie;  // se editeaza live in lista si nu vreau, si atunci creez copie cu object.assign

        this.service.formData = Object.assign({}, movie);  // in formData pune o copie a obiectului meu movie
        console.log("formdata din populate form " +this.service.formData);
        // Since the form is bound to formData properties,
        // the form field will get with populated corresponding details.

        console.log("click works");
        console.log(movie);
        console.log(movie.Title);
        console.log(this.service.formData.Title);
    }



    onDelete(id) {
        console.log("id este " + id);
        this.service.deleteMovie(id)
            .subscribe(response => {
                console.log("successfully deleted");
                this.getAllMovies(); // refresh
            },
                error => {
                    console.log(error);
                });
  
    }

}

