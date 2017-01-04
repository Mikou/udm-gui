import { Injectable }       from '@angular/core';
import { ConnectorService } from '../connector/connector.service';
import { User }             from '../security/user.model';
import { DecisionSpace }    from './decisionspace.model';
@Injectable()
export class UserinvitationService {

    constructor (
        private connectorService:ConnectorService,
    ) {
    }

    search(username:string) {
        return new Promise( (resolve, reject) => {
            if(username.length <= 1) {
                resolve([]); return;
            }
            this.connectorService.call('udm.backend.searchUsersWithPrefix', [username])
                .then( (users:User[]) => resolve(users) )
                .catch( err => reject(err) )
        });
    }

    invite(username:string, decisionspaceId:number, uri:string) {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.inviteUserWithUsername', [username, decisionspaceId, uri])
                .then( user => resolve(user) )
                .catch( err => reject(err) );
        });
    }

}