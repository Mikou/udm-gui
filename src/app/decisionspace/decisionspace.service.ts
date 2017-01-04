import { NgZone }           from '@angular/core';
import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { ConnectorService } from '../connector/connector.service';
import { DecisionSpace }    from './decisionspace.model';
import { DECISIONSPACES }   from './decisionspaces.mock';
import { User }             from '../security/user.model'
import { List }             from 'immutable';

//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

@Injectable()
export class DecisionspaceService {

    private decisionspaceId:Number;
    private _decisionspaces: BehaviorSubject<List<DecisionSpace>> = new BehaviorSubject(List([]));
    public decisionspaces: Observable<List<DecisionSpace>> = this._decisionspaces.asObservable();

    constructor(
        private connectorService:ConnectorService,
        private zone:NgZone
    ) {}

    getDecisionspaces(loggedInUser:User) {
        this.connectorService.call('udm.backend.getDecisionspaces', [loggedInUser]).then( (decisionspaces:List<DecisionSpace>) => {
            this._decisionspaces.next(decisionspaces);
        });
        return this.decisionspaces;
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

    checkPermissions(userId:number, decisionspaceId:number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connectorService.call('udm.backend.checkPermissions', [userId, decisionspaceId] )
                .then( hasAccess => {
                    console.log(hasAccess);
                    resolve(hasAccess)
                })
                .catch(err => reject(err));
        });
    }

    ngOnInit() {}

    updateDecisionspaces(arr:any) {
        console.log(JSON.parse(arr));
    }

}