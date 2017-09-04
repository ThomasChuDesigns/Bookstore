

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BooksComponent } from "../books/books.component";
import { HomeComponent } from "../home/home.component";
import { BookEditComponent } from "../books/book-edit/book-edit.component";
import { BookDetailComponent } from "../books/book-detail/book-detail.component";
import { SignupComponent } from "../auth/signup/signup.component";
import { SigninComponent } from "../auth/signin/signin.component";
import { AuthGuard } from "../auth/auth-guard.service";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: SignupComponent},
    {path: 'login', component: SigninComponent},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {}