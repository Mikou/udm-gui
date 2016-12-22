import { Injectable } from '@angular/core';
import { ConnectionService } from '../socketFactory/connection.service';

@Injectable()
export class UserinvitationService {

    constructor (
        //private connectionService:ConnectionService,
    ) {
    }

    search(username:string) {
        return new Promise( (resolve, reject) => {
            reject("Not yet implemented");
        });
        /*return new Promise( (resolve, reject) => {
            if(username.length <= 1) {
                resolve([]); return;
            }
            this.connectionService.call('udm.backend.searchUsersWithPrefix', [username])
                .then( users => resolve(users) )
                .catch( err => reject(err) )
        });*/
    }

    invite(username:string) {
        return new Promise( (resolve, reject) => {
            reject("Not yet implemented");
        });
        /*return new Promise( (resolve, reject) => {
            this.connectionService.call('udm.backend.inviteUserWithUsername', [username])
                .then( user => resolve(user) )
                .catch( err => reject(err) );
        });*/
    }

}