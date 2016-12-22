import { Component } from '@angular/core';
import { UserinvitationService } from './userinvitation.service';

import { FormControl, Validators }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'udm-inviteuser',
    template: `
        <input type="text" [formControl]="username"><button (click)="inviteUser()">invite user</button>
        <ul>
            <li *ngFor="let username of usernames" (click)="selectUsername(username)">{{username}}</li>
        </ul>
    `
})
export class UserinvitationComponent {
  usernames:Array<string>;
  username = new FormControl();

  constructor(
    private userinvitationService:UserinvitationService      
  ) {
      this.usernames = new Array<string>();

      this.username.validator = Validators.compose([
          Validators.minLength(3)
      ]);

      this.username.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .map( username => this.userinvitationService.search(username) )
        .subscribe( promise => {
            this.usernames = new Array<string>();
            promise.then( (usernames:Array<any>) => {
                usernames.forEach( user => {
                    this.usernames.push(user.username);
                })
            }).catch( err => {
                console.log(err);
            })
       })
  }

  selectUsername(username) {
      this.username.setValue(username);
  }

  inviteUser() {
      if(this.username.valid) {
          console.log(this.username.value);
          this.userinvitationService.invite(this.username.value)
            .then( user => console.log(user) )
            .catch( err => console.log(err) );
      }
  }

}