import { Injectable }      from '@angular/core';
import { Observable }      from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { ConnectionService} from '../../../socketFactory/connection.service';
import { List }            from 'immutable';
import { VisCtrl }         from './visCtrl.model';
import { VISCTRLS }        from './visCtrls.mock';
//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

@Injectable()
export class VisCtrlService {
    private _visCtrls: BehaviorSubject<List<VisCtrl>> = new BehaviorSubject(List([]));
    public visCtrls: Observable<List<VisCtrl>> = this._visCtrls.asObservable();

    constructor(
        //private connectionService: ConnectionService
    ) {

        this._visCtrls.next(List<VisCtrl>(VISCTRLS));
        /*this.connectionService.call('udm.backend.getVisCtrls', []).then(res => {
            this._visCtrls.next(res);
        }).catch(err => {
            console.log(err);
        });*/
    }
}