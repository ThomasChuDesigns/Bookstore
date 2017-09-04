import { NgModule } from "@angular/core";
import { BooksComponent } from "./books.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { LimitForPipe, LimitStringPipe } from "../shared/book-list.pipe";
import { SharedModule } from "../shared/shared.module";
import { BookRoutesModule } from "./book-routes.module";

@NgModule({
    declarations: [
        BooksComponent,
        BookEditComponent,
        BookDetailComponent,
        LimitForPipe,
        LimitStringPipe,
    ],
    imports: [
        SharedModule,
    ]
})
export class BooksModule {}