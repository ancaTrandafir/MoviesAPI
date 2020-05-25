import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    readonly rootURL = "https://localhost:44335";
    movieList: Movie[];
    selectedMovie: Movie;


    constructor(private http: HttpClient) {}
  

  //postMovie() {    
  //  return this.http.post(this.rootURL + '/movies', this.formData);   // POST function returns Observable
  //  // returneaza un movie tip service.formData
  //}





  getMovies() {
    return this.http.get<Movie[]>(this.rootURL + '/movies')
        // .subscribe(                     // tratez in service subscribe de Observable pt ca o voi tot apela ca refresh si sa injectez doar service, nu si alte componente
        //(data: any[]) => {
        //  console.log(data);
        //  this.movieList = data
        //}); // Nu imi afiseaza cu subscribe in service, dar daca pun subscribe in movie-list merge



      //.toPromise()
      //.then(response => this.movieList = response as Movie[])
  }


    getMovieById(id) {
        console.log("id este " + id);
        this.http.get<Movie>(this.rootURL + '/movies/' + id)
            .subscribe(result => {
                this.selectedMovie = result;

                console.log("filmul selectat este " + this.selectedMovie.Title);

            }, error => console.error(error));
    }




  //updateMovie(formData: Movie) {
  //  return this.http.put(this.rootURL + '/movies/' + formData.ID, this.formData);   // transmite URL si ID in PUT request prin concatenare
  //  // returneaza un Observable
  //}





  deleteMovie(id) {
    return this.http.delete(this.rootURL + '/movies/' + id);  
    // returneaza un Observable
  }
}
