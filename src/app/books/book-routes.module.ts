
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { BooksComponent } from "./books.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { AuthGuard } from "../auth/auth-guard.service";

const routes: Routes = [
    {path: 'books', component: BooksComponent},
    {path: 'books/add', component: BookEditComponent},
    {path: 'book/:slug', component: BookDetailComponent},
    {path: 'book/:slug/edit', component: BookEditComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class BookRoutesModule {}