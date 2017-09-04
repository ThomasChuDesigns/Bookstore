
import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Book } from "./book.model";
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class BookService {
    items: FirebaseListObservable<any[]>;
    currentLength: number;

    constructor(public db: AngularFireDatabase, private auth: AuthService) {
        this.items = db.list('/books', {query: { 
            limitToFirst: 10,
         }});

        this.items.subscribe(data => this.currentLength = data.length);
    }

    getListing(slug: string) {
        return this.db.object('/books/'+ slug);
    }

    getListingSnapshot(slug: string): Observable<any> {
        // returns a firebase object observable of listing information
        return this.db.object('/books/'+ slug, {preserveSnapshot: true}).take(1)
        .map(data => {return data.val()});
    }

    convertToSlug(name: string): string {
        // format: 000-book-name
        return this.currentLength + '-' + name.toLowerCase().split(' ').join('-');
    }

    addListing(book: Book) {
        book.user = this.auth.isAuthenticated().uid;
        this.items.update(book.slug, book);
    }

    editListing(slug: string, form) {
        this.db.object('/books/'+slug).update(form);
    }

    deleteListing(slug: string) {
        this.db.object('/books/'+slug).remove();
    }
}