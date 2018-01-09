import { Component } from '@angular/core';
import { IAuthor } from './../iauthor';

@Component({
    selector:'app-author-details',
    templateUrl:'./author-details.component.html'
})
export class AuthorDetailsComponent {
    author: IAuthor = {
        id:1,
        firstName:"Bob",
        lastName:"Smith",
        username:"bobsmith"
    }
}
