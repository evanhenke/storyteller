import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

    getPageSetup(totalItems: number, currentPage:number = 1, pageSize:number = 5) {
        let totalPages = Math.ceil(totalItems/pageSize);

        let startPage:number;
        let endPage:number;

        if (totalPages<=5) {
            startPage = 1
            endPage = totalPages;
        } else {
            //do some other shit
        }

        //return some page related stuff here... will complete this later...
        return null;
    }

}
