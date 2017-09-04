import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  
  constructor(public bookService: BookService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
