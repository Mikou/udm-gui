import{ Component, OnInit, Input } from '@angular/core';
import{ SecurityService } from './security.service';
import { User } from './user.model';
import { NotificationService } from '../notification/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {EmailValidator} from './emailValidator.validator';
import { PasswordConfirmValidator } from './passwordConfirm.validator';

@Component({
    selector: 'udm-register',
    template: `
        <h2>user registration</h2>
        <form (ngSubmit)="onSubmit(user)" [formGroup]="user">
            <p><label for="login">Name</label><input id="login" name="login" type="text" formControlName="username" /></p>
            <p><label for="email">Email</label><input id="email" name="email" type="email" formControlName="email" /></p>
            <p><label for="psswd">Password</label><input id="psswd" name="psswd" type="password" formControlName="password" /></p>
            <p><label for="pwdConfirm">Confirm Password</label><input id="pwdConfirm" name="pwdConfirm" type="password" formControlName="passwordConfirm" /></p>
            <input type="hidden" name="toggle" formControlName="roles">
            <p><input type="checkbox" name="role" value="{{roles[0].value}}"
                [checked]="roles[0].checked"
                (change)="updateRoles($event)">
            {{roles[0].display}}</p>
            <p><input type="checkbox" name="role" value="{{roles[1].value}}"
                [checked]="roles[1].checked"
                (change)="updateRoles($event)"
            >{{roles[1].display}}<br></p>
            <p><input type="checkbox" name="role" value="{{roles[2].value}}"
                [checked]="roles[2].checked"
                (change)="updateRoles($event)"
            >{{roles[2].display}}</p>
            <br>
            <p><label for="firstname">Firstname</label><input id="firstname" name="firstname" type="text" formControlName="firstname" /></p>
            <p><label for="lastname">Lastname</label><input id="lastname" name="lastname" type="text" formControlName="lastname" /></p>
            <button type="submit" [disabled]="user.invalid">Register</button>
        </form>
      `
})
export class RegisterComponent implements OnInit {
    user: FormGroup;
    private roles = [
        {value: 'admin', checked:false, display:'admin'},
        {value: 'domainexpert', checked:false, display:'domain expert'},
        {value: 'planner', checked:true, display:'planner'}
    ]
    constructor(
        private _securitySvc: SecurityService,
        private _notificationSvc: NotificationService
    ) {
    }

    ngOnInit() {
        this.user = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")]),
            password: new FormControl('', [Validators.minLength(6)]),
            passwordConfirm: new FormControl('', [PasswordConfirmValidator.equalsPassword]),
            roles: new FormControl(this.roles.filter( n => n["checked"]).map(n => n["value"]), [Validators.required]),
            firstname: new FormControl(''),
            lastname: new FormControl('')
        });
    }

    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        console.log(value);
        if(valid) {
            this._securitySvc.userRegistration(value).then( (user) => {
                console.log("user: ", user);
                this._notificationSvc.notify('User ' + user["username"] + ' was created. An email has been sent to him/her.', 'success');
            }).catch( err => this._notificationSvc.notify(err, 'error'));
        } else {
            this._notificationSvc.notify('Cannot register user. Form data is invalid', 'error');
        }
    }

    updateRoles(e:MouseEvent) {
        const isChecked = e.target["checked"];
        const formControl = this.user.get('roles');
        let roles = (formControl.value === null) ? [] : formControl.value;
        if(isChecked) { 
            roles.push(e.target['value']);
        }else {
            const index:number = roles.indexOf(e.target['value']);
            roles.splice(index, 1);
        }
        formControl.setValue(roles.length<1 ? null : roles);
    }
}