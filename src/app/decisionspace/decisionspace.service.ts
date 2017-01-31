import { NgZone }           from '@angular/core';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { ConnectorService } from '../connector/connector.service';
import { DecisionSpace }    from './models/decisionspace.model';
import { User }             from '../security/user.model'
import { List }             from 'immutable';

//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

@Injectable()
export class DecisionspaceService {

    private decisionspaceId:Number;
    private activeDecisionspace:DecisionSpace;

    private _decisionspaces: BehaviorSubject<List<DecisionSpace>> = new BehaviorSubject(List([]));
    public decisionspaces: Observable<List<DecisionSpace>> = this._decisionspaces.asObservable();

    constructor(
        private connectorService:ConnectorService,
        private zone:NgZone
    ) {}

    setDecisionspaceId(id:number):void {
        this.decisionspaceId = id;
    }

    private retrieveFull(loggedInUser:User, id:number):Promise<any> {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('backend.decisionspace.retrieve', [loggedInUser, id, true])
                .then( (decisionspace:DecisionSpace) => {
                    resolve(decisionspace);
                });
            return this.decisionspaces;    
        });
    }

    retrieveAll(loggedInUser:User) {
        this.connectorService.call('backend.decisionspace.retrieve', [loggedInUser, null, null])
            .then( (decisionspaces:List<DecisionSpace>) => {
                this._decisionspaces.next(decisionspaces);
            });
        return this.decisionspaces;
    }

    joinDecisionspace(loggedInUser:User, id:number):Promise<any> {
        return new Promise( (resolve, reject) => {
            this.retrieveFull(loggedInUser, id)
                .then( (decisionspace:DecisionSpace) => {
                    this.activeDecisionspace = decisionspace;
                    resolve(this.activeDecisionspace);
                })
        });
    }

    getDecisionspaceId() {
        return 1;
    }

    create(decisionspace:DecisionSpace) {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.decisionspaceRegistration', [decisionspace]).then((data:DecisionSpace) => {
                const list = this._decisionspaces.getValue();
                list.push(data);
                this._decisionspaces.next(List(list));
                resolve(data);
            }).catch( err => {
                reject(err);
            });
        });
    }

    getDecisionSpaceInfo(id:number): Promise<DecisionSpace> {
        return new Promise( (resolve, reject) => {
            //resolve(DECISIONSPACES[id]);
            this.connectorService.call('udm.backend.getDecisionspaceById', [id]).then( decisionspace => {
                resolve(decisionspace)
            }).catch( err => {
                reject("could not get decision space informations");
            })
        });
  
    }

    checkPermissions(user:User, decisionspaceId:number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connectorService.call('backend.decisionspace.canAccess', [user, decisionspaceId] )
                .then( hasAccess => {
                    console.log(hasAccess);
                    resolve(hasAccess)
                })
                .catch(err => reject(err));
        });
    }

    updateDecisionspaces(arr:any) {
        console.log(JSON.parse(arr));
    }

}