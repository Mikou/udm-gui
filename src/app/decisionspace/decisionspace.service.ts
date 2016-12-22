import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { List }            from 'immutable';
//import { ConnectionService } from '../socketFactory/connection.service';
import { DecisionSpace } from './decisionspace.model';
import { DECISIONSPACES } from './decisionspaces.mock';
import { User } from '../security/user.model'

//import { SocketFactoryService} from '../socketFactory/socketFactory.service';

//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

@Injectable()
export class DecisionspaceService {

    private decisionspaceId:Number;
    private _decisionspaces: BehaviorSubject<List<DecisionSpace>> = new BehaviorSubject(List([]));
    public decisionspaces: Observable<List<DecisionSpace>> = this._decisionspaces.asObservable();

    constructor(
        //private connectionService:ConnectionService,
        private zone:NgZone
    ) {

    }

    fetchList(user:User) {
        /*this.connectionService.call('udm.backend.decisionspaceList', [user]).then( (decisionspaces:List<DecisionSpace>) => {
            this._decisionspaces.next(decisionspaces);
        });*/

        let list = List(DECISIONSPACES);
        
        this._decisionspaces.next(list);
        return this.decisionspaces;
    }

    create(decisionspace:DecisionSpace) {
        return new Promise( resolve => {
            const list = this._decisionspaces.getValue();
            decisionspace.id = DECISIONSPACES.length;
            DECISIONSPACES.push(decisionspace);
            console.log(DECISIONSPACES);
            this._decisionspaces.next(List(DECISIONSPACES));
            resolve();
        } );

    }

    getDecisionSpaceInfo(id:number) {
        return new Promise( (resolve, reject) => {
            resolve(DECISIONSPACES[id]);
            /*this.connectionService.call('udm.backend.getDecisionspaceById', [id]).then( decisionspace => {
                resolve(decisionspace)
            }).catch( err => {
                reject("could not get decision space informations");
            })*/
        });
  
    }

    ngOnInit() {
        /*this.socketFactoryService.messages.subscribe(msg => {
          console.log("desicionspace service:", msg);
        })*/
    }

    updateDecisionspaces(arr:any) {
        console.log(JSON.parse(arr));
        
    }

}