
import { NgModule } from "@angular/core";
import { BookRoutesModule } from "../books/book-routes.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

@NgModule({
    declarations: [

    ],
    exports: [
        BookRoutesModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule {}