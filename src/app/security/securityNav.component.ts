import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security.service';
import {User} from './user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'udm-securitynav',
    template: `
        <span *ngIf="loggedInuser"><a [routerLink]=" ['./profile']">Welcome, {{loggedInuser.username}}</a></span>
        <span *ngIf="loggedInuser"><a (click)="logout()">logout</a></span>
        <span *ngIf="!loggedInuser"><a [routerLink]=" ['./login']">login</a></span>
        

    `
})
export class SecurityNavComponent implements OnInit{
    loggedInuser:User;

    constructor(
        private securityService:SecurityService
        ) {
    }

    ngOnInit() {
        this.securityService.loggedInUser$.subscribe( user => {
            this.loggedInuser = user;
        });
    }

    logout() {
        this.securityService.userLogout();
    }
}