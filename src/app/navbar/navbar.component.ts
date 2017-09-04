import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs/Subscription";
import { User } from "../auth/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
