import { Component, Input, Inject } from '@angular/core';
import { UsermanagerService } from './usermanager.service';
import { User }             from '../security/user.model';
import { FormControl, Validators }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DecisionSpace } from './decisionspace.model';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DOCUMENT } from '@angular/platform-browser'

@Component({
    selector: 'udm-inviteuser',
    template: `
        <input type="text" [formControl]="username"><button (click)="inviteUser()">invite user</button>
        <ul>
            <li *ngFor="let user of users" (click)="selectUsername(user)">{{user.username}}</li>
        </ul>
    `
})
export class UserinvitationComponent { 
  @Input() decisionspaceId:number;
  users:Array<User>;
  username = new FormControl();

  constructor(
    private userinvitationService:UsermanagerService,
    @Inject(DOCUMENT) private document: any    
  ) {
      this.users = new Array<User>();

      this.username.validator = Validators.compose([
          Validators.minLength(3)
      ]);

      this.username.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .map( username => this.userinvitationService.search(username) )
        .subscribe( promise => {
            this.users = new Array<User>();
            promise.then( (users:Array<User>) => {
                this.users = users;
            }).catch( err => {
                console.log(err);
            })
       })
  }

  selectUsername(user) {
      this.username.setValue(user.username);
  }

  inviteUser() {
      console.log(this.decisionspaceId);
      if(this.username.valid) {
          console.log(this.username.value);
          console.log("location ::", this.document.location);
          this.userinvitationService.invite(this.username.value, this.decisionspaceId, this.document.location.href)
            .then( user => console.log(user) )
            .catch( err => console.log(err) );
      }
  }

}