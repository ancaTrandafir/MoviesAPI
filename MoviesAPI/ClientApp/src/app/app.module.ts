import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MovieService } from './shared/movie.service';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DetailsComponent } from './details/details.component';
import { AddMovieComponent } from './add-movie/add-movie.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchDataComponent,
        DetailsComponent,
        AddMovieComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],

    providers: [MovieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
