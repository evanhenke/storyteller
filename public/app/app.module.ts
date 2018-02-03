import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigationbar/navigationbar.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';
import { ReaderComponent } from './reader/reader.component';

import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorDetailComponent } from './author/author-detail/author-detail.component';
import { PopularBooksComponent } from './book/popular-books/popular-books.component';

import { AuthorService } from './services/AuthorService';

@NgModule({
    imports:[
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    declarations:[
        AppComponent,
        NavigationBarComponent,
        FooterComponent,
        HomeComponent,
        WriterComponent,
        ReaderComponent,
        AuthorListComponent,
        AuthorDetailComponent,
        PopularBooksComponent,
    ],
    providers:[AuthorService],
    bootstrap:[AppComponent]
})
export class AppModule { }
