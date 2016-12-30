import { Injectable }      from '@angular/core';
import { Observable }      from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConnectorService} from '../../../connector/connector.service';
import { List }            from 'immutable';
import { VisCtrl }         from './visCtrl.model';
import { VISCTRLS }        from './visCtrls.mock';
//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

@Injectable()
export class VisCtrlService {
    private _visCtrls: BehaviorSubject<List<VisCtrl>> = new BehaviorSubject(List([]));
    public visCtrls: Observable<List<VisCtrl>> = this._visCtrls.asObservable();

    constructor(
        private connectorService: ConnectorService
    ) {
        //this._visCtrls.next(List<VisCtrl>(VISCTRLS));
        this.connectorService.call('udm.backend.getVisCtrls', []).then( (res:Array<VisCtrl>) => {
            let l:List<VisCtrl> = List(res);
            this._visCtrls.next(l);
        }).catch(err => {
            console.log(err);
        });
    }

    create(visCtrl:any) {
        
        /*let list:List<VisCtrl>  = this._visCtrls.getValue();
        let arr:Array<VisCtrl> = list.toArray();
        arr.push(visCtrl);
        this._visCtrls.next(List(arr)   );*/
    }
}