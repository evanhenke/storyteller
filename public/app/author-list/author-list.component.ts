import { Component } from '@angular/core';
import { IAuthor } from './author';

@Component({
    selector:'app-author-list',
    templateUrl:'./author-list.component.html'
})
export class AuthorListComponent {
    authorList: IAuthor[] = [
        {id:1,name:'Bob'},
        {id:2,name:'Alice'}
    ];
}
