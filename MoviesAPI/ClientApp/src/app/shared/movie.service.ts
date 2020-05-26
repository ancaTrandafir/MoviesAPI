import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class MovieService {

    readonly rootURL = "https://localhost:44335";
    public formData: Movie;
    public updateBtnMovieClicked;  // initial butonul de update nu e apasat; il importam in fetch-data
    public idCopied: number;  // copiez id sa pot apela la update pt ca voi redefini id ca undefined intre timp

    constructor(private http: HttpClient) {}



    postMovie() {
        console.log("din service" + this.formData.Title)
    return this.http.post(this.rootURL + '/movies', this.formData);   // POST function returns Observable
    // returneaza un movie tip service.formData
    
  }




  getMovies() {
      return this.http.get<Movie[]>(this.rootURL + '/movies')
     
  }


    //getMovieById(id) {                // in serviceComm pt ca returnez si lista de Comments
    //    console.log("id este " + id);
    //    return this.http.get<Movie>(this.rootURL + '/movies/' + id)
         
    //}


    // GET: movies/filter?from=a&to=b
    filterMoviesByDate(to, from) {
        return this.http.get<Movie[]>(this.rootURL + '/movies/filter?from=' + from + '&to=' + to);
    }



    updateMovie(formData: Movie) {
        console.log(formData);
    return this.http.put(this.rootURL + '/movies/' + this.idCopied, this.formData);   // transmite URL si ID in PUT request prin concatenare
    // returneaza un Observable
        // in idCopied e copiata valoarea id caruia i se face updata; daca zic this.formData.Id e undefined pt ca l-am resetat in Add-Movie
  }





  deleteMovie(id) {
    return this.http.delete(this.rootURL + '/movies/' + id);  
    // returneaza un Observable
  }
}
