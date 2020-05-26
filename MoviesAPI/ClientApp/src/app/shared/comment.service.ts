import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    readonly rootURL = "https://localhost:44335";
    commentList: Comment[];
    formData: Comment;


    constructor(private http: HttpClient) {}
  

  postComment() {    
    return this.http.post(this.rootURL + '/comments', this.formData);   // POST function returns Observable

  }



  getComments() {
    return this.http.get<Comment[]>(this.rootURL + '/comments')
 
  }


    //getMovieById(id) {
    //    console.log("id este " + id);
    //    this.http.get<Movie>(this.rootURL + '/movies/' + id)
    //        .subscribe(result => {
    //            this.selectedMovie = result;

    //            console.log("filmul selectat este " + this.selectedMovie.Title);

    //        }, error => console.error(error));
    //}




  updateComment(formData: Comment) {
      return this.http.put(this.rootURL + '/comments/' + formData.Id, this.formData);

  }


  deleteComment(id) {
    return this.http.delete(this.rootURL + '/comments/' + id);  
  
  }


}
