import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Author } from './../author/author';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthorService {
    userEndpoint:string = "http://localhost:3030/api/user/";

    constructor(private _http: HttpClient) { }

    getAllAuthors(): Observable<Author[]> {
        return this._http.get<Author[]>(this.userEndpoint)
            .do(data=>console.log('data is ' + JSON.stringify(data)))
            .catch((error)=>{
                this.handleError(error);
                return Observable.throw(error.statusText);
            });
    }

    getAuthorByUsername(str: String): Observable<Author> {
        return this._http.get<Author>(this.userEndpoint+str)
            .do(data=>console.log('data is ' + JSON.stringify(data)))
            .catch((error)=>{
                this.handleError(error);
                return Observable.throw(error.statusText);
            });
    }

    private handleError(error:HttpErrorResponse) {
        alert("handleError in author service says: " + error.message);
    }
}
