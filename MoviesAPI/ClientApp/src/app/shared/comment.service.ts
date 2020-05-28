import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    readonly rootURL = "https://localhost:44335";
    commentList: Comment[];
    formDataComm: Comment;
    selectedComment: Comment;
    updateBtnCommClicked: boolean;


    constructor(private http: HttpClient) {}
  

  postComment() {    
    return this.http.post(this.rootURL + '/comments', this.formDataComm);   // POST function returns Observable

  }



  getComments() {
    return this.http.get<Comment[]>(this.rootURL + '/comments')
 
  }


  getCommentById(id) {
        console.log("id este " + id);
      return this.http.get<Comment>(this.rootURL + '/comments/' + id);
           // .subscribe(result => {
           //.toPromise()
           //.then(result => {
           //     this.selectedComment= result;

           //     console.log("comment selectat este " + this.selectedComment.Text);

           // }, error => console.error(error));
    }




  updateComment(formData: Comment) {
      return this.http.put(this.rootURL + '/comments/' + formData.Id, this.formDataComm);

  }


  deleteComment(id) {
    return this.http.delete(this.rootURL + '/comments/' + id);  
  
  }


}
