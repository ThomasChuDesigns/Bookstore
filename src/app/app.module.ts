import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BooksComponent } from './books/books.component';
import { AppRoutesModule } from "./shared/app-routes.module";
import { HomeComponent } from './home/home.component';

import { AngularFireModule} from 'angularfire2';
import { BookService } from "./books/book.service";
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { LimitForPipe, LimitStringPipe } from "./shared/book-list.pipe";
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";
import { firebaseConfig } from './firebase.config';
import { BooksModule } from "./books/books.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutesModule,
    BooksModule,
    SharedModule,
  ],
  providers: [BookService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
