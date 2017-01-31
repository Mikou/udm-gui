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
        //this._visCtrls.next(List<VisCtrl>(VISCTRLS))
    }

    loadVisCtrls():Observable<List<VisCtrl>> {
        this.connectorService.call('backend.visctrl.retrieve', []).then( (res:Array<VisCtrl>) => {
            let l:List<VisCtrl> = List(res);
            this._visCtrls.next(l);
        }).catch(err => {
        });

        return this.visCtrls;
    }

    create(visCtrl:any, userId:number) {
        return new Promise( (resolve, reject) => {        
            visCtrl.author = userId;
            this.connectorService.call('backend.visctrl.create', [visCtrl, userId]).then( (res:VisCtrl) => {
                let list:List<VisCtrl>  = this._visCtrls.getValue();
                let arr:Array<VisCtrl> = list.toArray();
                arr.push(visCtrl);
                this._visCtrls.next(List(arr));
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    }
}