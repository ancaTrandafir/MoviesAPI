import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../shared/comment.model';
import { CommentService } from '../shared/comment.service';
import { MovieComm } from '../shared/movieComm.model';
import { MovieCommService } from '../shared/movieComm.service';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styles: []
})

export class DetailsComponent implements OnInit {

    public comments: Comment[];
    public idCommSelected: number;
    public commToBeUpdated: Comment;
    public copyOfSelectedComment: MovieComm; // pt ca sunt operatii asincrone si treb copiat sa il pot reaccesa


    constructor(private movieCommService: MovieCommService,   // importam service-ul care include si proprietatea Comments in Movie
                private commentService: CommentService,
                private activatedRoute: ActivatedRoute,
                private location: Location) { }




    // https://www.tektutorialshub.com/angular/angular-passing-parameters-to-route/
    // https://angular.io/tutorial/toh-pt5






    ngOnInit(): void {

       // this.resetForm();   // initialize model property

        this.getMovieById();
      //  this.getComments();

        //if (this.commentService.updateBtnCommClicked == true) // daca s-a apasat butonul de Update
        //{
        //    this.populateForm();
        //    console.log("dsgvds" + this.commentService.commentList);
        //}


       // else
            this.resetForm();   // initialize model property

       
    }





    getMovieById(): void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log("id din  details " + id);
        this.movieCommService.getMovieById(id)    // returneaza un Observable si nu mai este asincron
            // .subscribe(m => this.selectedMovie = m);  // tratez in service getById, aici doar apelez
            .toPromise()
            .then(response => {
                this.movieCommService.selectedMovie = response as MovieComm;
                this.copyOfSelectedComment = this.movieCommService.selectedMovie;  // e tip MovieComm
            });

        console.log(this.movieCommService.selectedMovie);  // daca foloseam Subscribe, getMovieById era asincron si intarzia functia pana sa se proceseze si atunci selectedMovie ramanea tot undefined pt ca nu e initializat sus
        
    }


    // The route.snapshot is a static image of the route information shortly after the component was created.

    // The paramMap is a dictionary of route parameter values extracted from the URL.The "id" key returns the id of the movie to fetch.

    // Route parameters are always strings. The JavaScript(+) operator converts the string to a number, which is what a movie id should be.





    //// Populam tabelul din Form; in form verific cu ngIf daca comm.movieId = movie.id
    //getComments() {         // Get din controller de Comm

    //    this.commentService.getComments()
    //        .subscribe(data => this.comments = data)
    //}





    resetForm(formComment?: NgForm) {    // form? parametrul poate fi null

        //if (this.commentService.updateBtnCommClicked == true) // daca s-a apasat butonul de Update
        //    this.populateForm();

        if (formComment != null)
            formComment.form.reset();  // form.reset() -> all desccendents are marked pristine and untouched and values are null

        this.commentService.formDataComm = {  // initialize model property
            Id: 0,
            MovieID: 0,
            Text: '',
            Important: true,
        }


        this.commToBeUpdated = { // altfel e undefined cand vreau sa-l initializez
            Id: 0,
            MovieID: 0,
            Text: '',
            Important: true,
        }

        this.commentService.formDataComm.Id = 0; // il fac explicit 0 pt ca ramane suprascris cu idComment updatat anterior din cauza apelului  autofillFormForUpdate()  daca am apucat sa fac inainte update

      //  console.log(formComment.value.Id);
    }




    onSubmit(formComment: NgForm) {

        // facem diferenta intre Post si PUT verificand Id; undefined sau 0
       // if (formComment.value.Id == 0 && this.commentService.updateBtnCommClicked == false)         //{)

        if (this.commentService.formDataComm.Id == 0)
            this.insertRecord(formComment);

        else  // update
            this.updateRecord(formComment);

    }




    insertRecord(formComment: NgForm) {  // POST request on submit
        this.commentService.formDataComm.MovieID =  +this.activatedRoute.snapshot.paramMap.get('id');

        console.log(this.commentService.formDataComm);   // aici inca nu are id, abia dupa ce ii fac post primeste id

        this.commentService.postComment()       //.subscribe(   // // Call subscribe() to start listening for updates.
            .toPromise()
            .then(
            response => {    // if POST operation succeeds we set the form to initial values
                console.log(this.commentService.formDataComm);
                this.resetForm(formComment);
                  this.getMovieById();    // refresh la lista, care e o lista de moviesComm
               // this.getComments();   // Nu, lista are obiecte Comm
            },

            error => {
                console.log(error)
            })
    }





    // e asincron si folosim Promise in loc de subscribe
    updateRecord(formComment: NgForm) {  // PUT request on submit
        
        formComment.value.Id = this.commToBeUpdated.Id;  // asignez lui formDataComm id-ul lui commToBeUpdated;                 copiat din apelul onUpdate() la click event
        //formComment.value.MovieID = +this.activatedRoute.snapshot.paramMap.get('id');  // asignez movieID din ruta, sa pot avea toate proprietatile pt a putea construi un movie, pt ca nu iau toate proprietatile din form

        console.log(formComment.value.Id);

        //this.getMovieById();

        console.log("am intrat in updateRecord "+ formComment.value);

        this.commentService.updateComment(formComment.value) // ID
            //.subscribe(   // // Call subscribe() to start listening for updates.

            //    response => {    // if PUT operation succeeds we set the form to initial values
            //        this.resetForm(form);
            //           this.getMovieById(); // refresh la lista;                                                          // success ia ca parametri un mesaj si numele aplicatiei 'Title' tip string
            //      //  this.getComments();
            //    },
            .toPromise()
            .then(response => {    // if PUT operation succeeds we set the form to initial values

                //this.copyOfSelectedComment = this.movieCommService.selectedMovie;  // e tip MovieComm

                this.resetForm(formComment);
                this.getMovieById(); // refresh la lista;                                                          // success ia ca parametri un mesaj si numele aplicatiei 'Title' tip string
                  //  this.getComments();
                console.log("Update comment successfully");
            },

                error => {
                    console.log(error)
                })

        this.resetForm(formComment);
        this.commentService.updateBtnCommClicked = false;   // setam inapoi butonul de update la false
        //this.getMovieById(); // refresh la lista; 
    }






  
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // ATENTIE: IN TABEL AM TIPUL MOVIECOMM, NU COMMENT!!
    populateForm(c)  // populam form cu movieComm selectat si incarcat din server, dar transformat intru-un Comment
    {                           // form data este proprietatea din service referitoare la form

        console.log(this.copyOfSelectedComment);
        console.log(this.commentService.getCommentById(c.Id));

        //this.commentService.updateBtnCommClicked = true; // s-a apasat butotnul de Update
        //c.Id = this.copyOfSelectedComment.Comments.Id;   // fac legaturi intre cele 2 obiecte; transfer proprietati de la copie la obiectul nou construit
        //c.MovieID = this.copyOfSelectedComment.Comments.MovieID;
        //c.Text = this.copyOfSelectedComment.Comments.Text;
        //c.Important = this.copyOfSelectedComment.Comments.Important;

        this.commentService.getCommentById(c.Id)
            .toPromise()
            .then(result => {
                this.commentService.selectedComment = result;

                console.log("comment selectat este " + this.commentService.selectedComment.Text);

                this.commToBeUpdated.Id = this.commentService.selectedComment.Id;     // this.idCommSelected;
                this.commToBeUpdated.MovieID = this.commentService.selectedComment.MovieID;        // valorile sunt luate din tabel, vezi structura campurilor
                this.commToBeUpdated.Text = this.commentService.selectedComment.Text
                this.commToBeUpdated.Important = this.commentService.selectedComment.Important;

                console.log(this.commToBeUpdated);

            }, error => console.error(error));




        //this.commToBeUpdated.Id = this.commentService.getCommentById(c.Id);     // this.idCommSelected;
        //this.commToBeUpdated.MovieID = c.Comments.MovieID;        // valorile sunt luate din tabel, vezi structura campurilor
        //this.commToBeUpdated.Text = c.Comments.Text
        //this.commToBeUpdated.Important = c.Comments.Important;
        

        // transformam MovieComm in Comm
        //this.commToBeUpdated.Id = c.Comments.Id;     // this.idCommSelected;
        //this.commToBeUpdated.MovieID = c.Comments.MovieID;        // valorile sunt luate din tabel, vezi structura campurilor
        //this.commToBeUpdated.Text = c.Comments.Text
        //this.commToBeUpdated.Important = c.Comments.Important;

        this.commentService.formDataComm = this.commToBeUpdated;        // formData din service ia valoarea noului obiect construit

        console.log(this.commentService.formDataComm.Text);
    }           // formDataComm este suprascris si il pot apela ca parametru la populateForm in ngOnInit








    //onUpdate(id) {  
    //    this.idCommSelected = id;
    //    console.log("clicked, id = ", this.idCommSelected);
    //    this.commentService.updateBtnCommClicked = true; // s-a apasat butotnul de Update


    //}




    onDelete(id) {
        console.log(id);
        this.commentService.deleteComment(id)
            .subscribe(response => {
                console.log("successfully deleted");
                this.getMovieById(); // refresh
            },
                error => {
                    console.log(error);
                });

    }





    goBack(): void {
        this.location.back();
    }
}   




 








 
