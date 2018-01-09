import { Component } from '@angular/core';
import { IAuthor } from './../iauthor';

@Component({
    selector:'app-author-list',
    templateUrl:'./author-list.component.html'
})
export class AuthorListComponent {
    authorList: IAuthor[] = [
        {
            id:1,
            firstName:"Bob",
            lastName:"Smith",
            username:"bobsmith"
        },
        {
            id:2,
            firstName:"Alice",
            lastName:"Johnson",
            username:"alijohnson"
        }
    ];
}
