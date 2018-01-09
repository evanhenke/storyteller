import { Component } from '@angular/core';
import { IBook } from './../ibook';

@Component({
    selector:'app-popular-books',
    templateUrl:'./popular-books.component.html'
})
export class PopularBooksComponent {
    imageSize:number=300;
    books: IBook[] = [
        {
            id:1,
            authorId:1,
            title:"This is a good book!",
            description:"This book is supposed to be super good, you should read it!",
            rating:5,
            imageUrl:"https://www.arborday.org/images/hero/medium/hero-ring-of-trees-looking-up.jpg"
        },
        {
            id:2,
            authorId:2,
            title:"This book is okay.",
            description:"This book decent. You could read better, but you could also read worse.",
            rating:1,
            imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/files/Neutral_Face_Emoji.png?9898922749706957214"
        },
        {
            id:3,
            authorId:3,
            title:"This book is garbage :(",
            description:"This book is horrible, you probably shouldn't read it.",
            rating:1,
            imageUrl:"https://img00.deviantart.net/da7b/i/2004/242/7/d/299_dumpster.jpg"
        }
    ];
}
