import { Component, OnInit }              from '@angular/core';
import { ToolbarComponent }               from './decisionspace/toolbar/toolbar.component';
import { Router, NavigationStart, Event } from '@angular/router';
import { NotificationComponent }          from './notification/notification.component';
import {SecurityService}                  from './security/security.service';
@Component({
    selector: 'udm-menu',
    styles: [`
        ul {padding:0;list-style:none;}
    `],
    template: `
        <ul>
            <li *ngIf="canRegister">
            <a [routerLink]=" ['./register'] ">
                Add a new user
            </a>
            </li>
        </ul>
        <udm-toolbar *ngIf="displayToolbar"></udm-toolbar>
        <udm-notification></udm-notification>
    `
})
export class MenuComponent implements OnInit {
    displayToolbar:boolean = false
    canRegister:boolean;
    constructor (
        private securityService:SecurityService,
        private router: Router
    ) {
        this.router.events.subscribe((event:Event) => {
            if(event instanceof NavigationStart) {
                var re = new RegExp("decisionspaces\/detail\/[0-9]");
                this.displayToolbar = (re.test(event.url));
            }
        }); 
    }

    ngOnInit() {
        this.securityService.loggedInUser$.subscribe( (user) => {
            console.log("->", user);
            this.canRegister = this.securityService.hasRole('admin');
        })
    }

}