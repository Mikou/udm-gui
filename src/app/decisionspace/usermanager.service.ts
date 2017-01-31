import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { List }             from 'immutable';
import { Injectable }       from '@angular/core';
import { ConnectorService } from '../connector/connector.service';
import { User }             from '../security/user.model';
import { DecisionSpace }    from './decisionspace.model';
import { PriviledgedUser }  from './privilegeduser.model';
@Injectable()
export class UsermanagerService {

    private _privilegedUsers: BehaviorSubject<List<PriviledgedUser>> = new BehaviorSubject(List([]));
    public privilegedUsers: Observable<List<PriviledgedUser>> = this._privilegedUsers.asObservable();

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

    invite(username:string, decisionspaceId:number, uri:string):Promise<User> {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.inviteUserWithUsername', [username, decisionspaceId, uri])
                .then( user => resolve(user) )
                .catch( err => reject(err) );
        });
    }

    unauthorize(userId) {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.unauthorize', [userId])
                .then( () => {
                    this._privilegedUsers.next(
                        List<PriviledgedUser>(this._privilegedUsers.getValue()
                            .filter( user => user.id !== userId) )
                    )
                    resolve();
                })
                .catch( err => reject(err) );
        } )
    }

    getUserList(decisionspaceId:number):Observable<List<PriviledgedUser>> {
        this.connectorService.call('udm.backend.getPriviledgedUsers', [decisionspaceId])
            .then( users => {
                this._privilegedUsers.next(users);
            })
            .catch( err => {
                console.log(err);
            });
        return this.privilegedUsers;
    }

}