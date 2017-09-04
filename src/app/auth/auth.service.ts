

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/take'

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { User } from "./user.model";
import { CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { BookService } from "../books/book.service";

@Injectable()
export class AuthService {
    user: FirebaseObjectObservable<User>;
    users: FirebaseListObservable<any[]>;

    constructor(private af: AngularFireAuth, private db: AngularFireDatabase) {
        this.af.authState.subscribe(
            user => {
                console.log(user);
                this.user = user ? this.db.object('/users/'+user.uid): null;
            });
        
    }

    login(email: string, password: string) {
        this.af.auth.signInWithEmailAndPassword(email, password);
    }

    register(username: string, email: string, password: string) {
        this.af.auth.createUserWithEmailAndPassword(email, password).then(
            (res) => {
                this.db.object('/users/'+res.uid).set(new User(username));
            });
    }

    logout() {
        if (this.isAuthenticated()) {
            this.af.auth.signOut();
        }
    }

    isAuthenticated() {
        return this.af.auth.currentUser;
    }

    updateUser(uid: string, user: User) {
        this.users.update(uid, user);
    }

    getUser(uid: string) {
        return this.db.object('/users/'+uid).take(1);
    }

    getUsername(uid: string) {
        return new Promise((resolve) => {
            this.db.object('/users/'+uid, {preserveSnapshot: true}).take(1).subscribe(snapshot => resolve(snapshot.val()));
        }).then((data: any) => data.username);
    }

}