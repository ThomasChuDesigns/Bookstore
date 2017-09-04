import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from "../book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../book.model";
import { AuthService } from "../../auth/auth.service";
import { FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from "@angular/forms";
import { Http, RequestOptions, Headers } from "@angular/http";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  book: FirebaseObjectObservable<any>;
  currentPhoto: number = 0;

  imageLength: number;

  bookSubscription: Subscription;
  seller: Promise<any>;
  listing: any;

  constructor(public bookService: BookService, public auth: AuthService, private route: ActivatedRoute,
              private router: Router, private modal: NgbModal, private http: Http) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // get book observable object
      this.book = this.bookService.getListing(params['slug']);
    });
    this.bookSubscription = this.book.subscribe(data => {
      this.listing = data;
      this.seller = this.auth.getUsername(data.user);
      this.imageLength = data.images.length;
    });
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

  onCheckout(modalForm) {
    this.modal.open(modalForm);
  }

}
