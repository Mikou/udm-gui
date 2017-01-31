import { Component, OnInit, NgZone }  from '@angular/core';
import { UsermanagerService }         from './usermanager.service';
import { PriviledgedUser }            from './privilegeduser.model';
import { List }                       from 'immutable';
import { NotificationService }        from '../notification/notification.service';
@Component({
    selector: 'udm-userlist',
    template: `<p>user list</p>
        <ul>
            <li *ngFor="let user of users">{{user.username}} <button (click)="unauthorize(user)">remove</button></li>
        </ul>
    `
})
export class UserlistComponent implements OnInit {
    users:List<PriviledgedUser>
    constructor(
        private usermanagerService:UsermanagerService,
        private zone:NgZone,
        private notificationService: NotificationService
    ) {

    }

    ngOnInit() {
        this.usermanagerService.getUserList(1).subscribe( (users:List<PriviledgedUser>) => {
            this.zone.run( () => this.users = users );        
        })
    }

    unauthorize(user:PriviledgedUser) {
        this.usermanagerService.unauthorize(user.id).then( () => {
            console.log("unauthorized done");
            this.notificationService.notify(user.username + "'s access to this decision space has been revoked");
        }).catch( err => console.log(err) );
            this.notificationService.notify("failed to revoke the access to user " + user.username);
            console.log(user);
    }

}