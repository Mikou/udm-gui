import { Component, Input } from '@angular/core';
import { UserinvitationComponent }  from './userinvitation.component';
import { UserlistComponent }        from './userlist.component';
import { UsermanagerService }       from './usermanager.service';
import { PriviledgedUser }          from './privilegeduser.model';
import { List }             from 'immutable';

@Component({
    selector: 'udm-usermanager',
    template: `
        <h3>user management</h3>
        <p>Here you can administrate the users allowed within this decisionspace.</p>
        <udm-inviteuser [decisionspaceId]="decisionspaceId"></udm-inviteuser>
        <udm-userlist></udm-userlist>
    `
})
export class UsermanagerComponent {
    @Input() decisionspaceId: number;
    users:List<PriviledgedUser>;

    constructor(
        private usermanagerService:UsermanagerService,
    ) {

    }
}