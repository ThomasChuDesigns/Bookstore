import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { BookService } from "../books/book.service";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private bookService: BookService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // retrieve new promise that checks if listing user == current user
        return this.bookService.getListingSnapshot(route.params['slug']).map((data:any) => {
            return data.user == this.auth.isAuthenticated().uid;
        });
    }
}