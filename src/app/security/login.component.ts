import { Component, OnInit, Input } from '@angular/core';
import { SecurityService } from './security.service';
import { CandidateUser } from './candidateUser.model';
import { User } from './user.model';
import { NotificationService } from '../notification/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'udm-login',
    template: `
        <h2>user login</h2>
        <form (ngSubmit)="onSubmit(login)" [formGroup]="login">
            <p><label for="login">Username</label><input id="login" name="login" type="text" formControlName="username" /></p>
            <p><label for="password">Password</label><input id="password" name="password" type="password" formControlName="password" /></p>
            <button type="submit" [disabled]="login.invalid">Submit</button>
        </form>
      `
})
export class LoginComponent implements OnInit {
    login: FormGroup;

    constructor(
        private _securitySvc: SecurityService,
        private _notificationSvc: NotificationService
    ) {
    }

    ngOnInit() {
        this.login = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(2)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        if(valid) {
            this._securitySvc.userLogin(value).then((user:User) => {
            }).catch( err => this._notificationSvc.notify(err, 'error'));
        }
    }
}