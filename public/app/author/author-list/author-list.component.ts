import { Component, OnInit } from '@angular/core';
import { Author } from './../author';
import { AuthorService } from './../../services/AuthorService';
import { Observable } from 'rxjs/Observable';

@Component({
    selector:'app-author-list',
    templateUrl:'./author-list.component.html'
})
export class AuthorListComponent implements OnInit {
    authorList: Author[];
    filteredAuthors: Author[];
    _listFilter: string = null;

    get listFilter(): string  { return this._listFilter; }
    set listFilter(str:string) {
        this._listFilter = str;
        this.filteredAuthors =
            this._listFilter ? this.performFilter(this._listFilter) : this.authorList;
    }

    constructor(private _authorService: AuthorService) {
        this._authorService = _authorService;
    }

    ngOnInit() {
        this._authorService.getAllAuthors()
        .subscribe(
            (authors:Author[])=>{
                this.authorList = authors;
                this.filteredAuthors = authors;
            },
            error=>console.log(error.message)
        );
    }

    performFilter(filterBy:string): Author[] {
        filterBy = filterBy.toLowerCase();
        return this.authorList.filter((author:Author) =>
            author.username.toLowerCase().indexOf(filterBy) !== -1);
    }
}
