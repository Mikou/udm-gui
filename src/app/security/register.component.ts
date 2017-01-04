import{ Component, OnInit, Input } from '@angular/core';
import{ SecurityService } from './security.service';
import { User } from './user.model';
import { NotificationService } from '../notification/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EmailValidator} from './emailValidator.validator';
import { PasswordConfirmValidator } from './passwordConfirm.validator';

@Component({
    selector: 'ud2d-register',
    template: `
        <h2>user registration</h2>
        <form (ngSubmit)="onSubmit(user)" [formGroup]="user">
            <p><label for="login">Name</label><input id="login" name="login" type="text" formControlName="name" /></p>
            <p><label for="email">Email</label><input id="email" name="email" type="email" formControlName="email" /></p>
            <p><label for="psswd">Password</label><input id="psswd" name="psswd" type="password" formControlName="password" /></p>
            <p><label for="pwdConfirm">Confirm Password</label><input id="pwdConfirm" name="pwdConfirm" type="password" formControlName="passwordConfirm" /></p>
            <p><input type="radio" formControlName="role" name="role" value="admin">Admin</p>
            <p><input type="radio" formControlName="role" name="role" value="domainexpert">Domain Expert<br></p>
            <p><input type="radio" formControlName="role" name="role" value="planner">Planner</p>
            <br>
            <p><label for="firstname">Firstname</label><input id="firstname" name="firstname" type="text" formControlName="firstname" /></p>
            <p><label for="lastname">Lastname</label><input id="lastname" name="lastname" type="text" formControlName="lastname" /></p>
            <button type="submit" [disabled]="user.invalid">Register</button>
        </form>
      `
})
export class RegisterComponent implements OnInit {
    user: FormGroup;

    constructor(
        private _securitySvc: SecurityService,
        private _notificationSvc: NotificationService
    ) {
    }

    ngOnInit() {
        this.user = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")]),
            password: new FormControl('', [Validators.minLength(6)]),
            passwordConfirm: new FormControl('', [PasswordConfirmValidator.equalsPassword]),
            role: new FormControl(''),
            firstname: new FormControl(''),
            lastname: new FormControl('')
        });
    }

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        console.log(value);
        if(valid) {
            this._securitySvc.userRegistration(value).then( (user) => {
                console.log("user: ", user);
            }).catch( err => this._notificationSvc.notify(err, 'error'));
        } else {
            console.log("invalid");
            console.log(this.user.errors);
        }
    }
}