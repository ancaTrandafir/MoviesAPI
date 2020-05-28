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
        this.getAllMovies();
    }






    onSubmit(form: NgForm) {
        this.submitPressed = true; // inseamna  ca s-a accesat input-ul de filter si returnam filteredMovies
        this.getFilteredMoviesByDate(form);
    
    }






    // in acelasi tabel afisez fie toate filmele, fie pe cele filtrate
    // diferenta o face o variabila submitPressed care initial este false si isi schimba valoarea daca se apasa submit

    getAllMovies() {
        this.service.getMovies()
            .subscribe(data => this.movies = data);
    }





    getFilteredMoviesByDate(form: NgForm) {

        console.log(form.value.from);

        this.service.filterMoviesByDate(form.value.from, form.value.to)     //form.value.
            // .subscribe(data => {
            .toPromise()
            .then(response => {
                this.movies = response;
                console.log(this.movies)
            });
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





    // auto fill form
    populateForm(movie: Movie)  // populam form cu movie selectat si incarcat din server
    {                           // form data este proprietatea din service referitoare la form

        this.service.formDataMovie = movie; 
        this.service.updateBtnMovieClicked = true;   // se apasa butonul, il apelez in add-movie
        this.service.idCopied = movie.Id;   // copiez valoare id si apelez din add-movie la update

        console.log(movie);

        //this.service.formData = Object.assign({}, movie);  // in formData pune o copie a obiectului meu movie
        //console.log(this.service.formData);
        // Since the form is bound to formData properties,
        // the form field will get with populated corresponding details.

     
    }




    refreshList() {
        console.log("refresh clicked");
        this.getAllMovies();
    }

}

