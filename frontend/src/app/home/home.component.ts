import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.auth.loggedIn$
      .subscribe(loggedIn => {
        if (loggedIn) {
          // TODO
        } else {
          // TODO
        }
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    this.authSubscription.unsubscribe();
  }


}
