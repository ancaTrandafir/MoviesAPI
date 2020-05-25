import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FetchDataComponent} from "./fetch-data/fetch-data.component";
import { DetailsComponent } from "./details/details.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";


const routes: Routes = [
    
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: 'fetch-data/:id', component: DetailsComponent },
    { path: 'add', component: AddMovieComponent },
    { path: 'update/:id', component: AddMovieComponent },
    { path: 'delete/:id', component: FetchDataComponent } 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
