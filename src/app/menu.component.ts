import { Component } from '@angular/core';
import { ToolbarComponent } from './decisionspace/toolbar/toolbar.component';
import { Router, NavigationStart, Event } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

@Component({
    selector: 'udm-menu',
    styles: [`
        ul {padding:0;list-style:none;}
    `],
    template: `
        <ul>
            <li>
            <a [routerLink]=" ['./register'] ">
                Add a new user
            </a>
            </li>
        </ul>
        <udm-toolbar *ngIf="displayToolbar"></udm-toolbar>
        <udm-notification></udm-notification>
    `
})
export class MenuComponent {

    displayToolbar:boolean = false

    constructor (private router: Router) {
        this.router.events.subscribe((event:Event) => {
            if(event instanceof NavigationStart) {
                var re = new RegExp("decisionspaces\/detail\/[0-9]");
                this.displayToolbar = (re.test(event.url));


            }
        }); 
    }

}