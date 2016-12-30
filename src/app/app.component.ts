/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { MenuComponent } from './menu.component';
import { FooterComponent } from './footer.component';
import { SecurityService } from './security/security.service';
import { SecurityNavComponent } from './securityNav.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div class="nav-bar">
      <nav>
        <span>
          <a [routerLink]=" ['./home'] ">
            Home
          </a>
        </span>
        |
        <span>
          <a [routerLink]=" ['./decisionspaces'] ">
            Decision Spaces
          </a>
        </span>
        |
        <span>
          <a [routerLink]=" ['./connectiontest'] ">
            backend test
          </a>
        </span>

        <udm-securitynav></udm-securitynav>

        <!--<span class="login">
          <a [routerLink]=" ['./login'] ">
            login
          </a>
        </span>-->
      </nav>
    </div>

    <div class="globalContainer">
      <udm-menu *ngIf="displayMenu"></udm-menu>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>

    <udm-footer></udm-footer>
  `
})
export class AppComponent {
  name = 'Urban Decision Maker';
  displayMenu:boolean = true;

  constructor(
    public securityService: SecurityService,
    public appState: AppState
    ) 
  {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.securityService.selectedUser$.subscribe( (user) => {
      console.log(user);
    })
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
