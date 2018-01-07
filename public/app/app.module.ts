import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WriterComponent } from './writer/writer.component';
import { ReaderComponent } from './reader/reader.component';
import { NavigationBarComponent } from './navigationbar/navigationbar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports:[
        BrowserModule,
        AppRoutingModule
    ],
    declarations:[
        AppComponent,
        HomeComponent,
        WriterComponent,
        ReaderComponent,
        NavigationBarComponent,
        AuthorListComponent,
        FooterComponent
    ],
    bootstrap:[AppComponent]
})
export class AppModule { }
