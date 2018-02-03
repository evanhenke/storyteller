import { Component } from '@angular/core';
import { Author } from './../author';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from "../../services/AuthorService";

@Component({
    selector: 'author-detail',
    templateUrl: './author-detail.component.html'
})
export class AuthorDetailComponent {
    author:Author = null;

    constructor(private _route:ActivatedRoute, private _authorService:AuthorService) {
        this._authorService.getAuthorByUsername(this._route.snapshot.paramMap.get('username'))
            .subscribe(
                (data:Author)=>this.author=data,
                (error)=>alert(error.message)
            );
    }

}
