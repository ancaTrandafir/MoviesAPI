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
          //.subscribe(data => this.movieList = data);

          //.toPromise()
          //.then(response => this.movieList = response as Movie[])
  }


    getMovieById(id) {
        console.log("id este " + id);
        return this.http.get<Movie>(this.rootURL + '/movies/' + id)
            //  .subscribe(data => this.selectedMovie = data);

            //.toPromise()
            //.then(response => this.selectedMovie = response)
         
    }


    //public getProduct(id) {     // fara Http Request, ci cu ActiveRoute
    //    let movieList: Movie[] = this.getMovies();
    //    return movieList.find(m => m.ID == id);
    //}


  //updateMovie(formData: Movie) {
  //  return this.http.put(this.rootURL + '/movies/' + formData.ID, this.formData);   // transmite URL si ID in PUT request prin concatenare
  //  // returneaza un Observable
  //}





  deleteMovie(id) {
    return this.http.delete(this.rootURL + '/movies/' + id);  
    // returneaza un Observable
  }
}
