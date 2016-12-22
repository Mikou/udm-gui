import { OnInit, Injectable }      from '@angular/core';
import { Headers, Http }   from '@angular/http';
import { WIDGETS }         from './mock-widgets';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { List }            from 'immutable';
import { Observable }      from "rxjs/Observable";
//import { ConnectionService } from '../../../socketFactory/connection.service'

@Injectable()
export class WidgetService {

    private decisionspaceId:number = null;
    private _widgets: BehaviorSubject<List<any>> = new BehaviorSubject(List([]));
    public widgets: Observable<List<any>> = this._widgets.asObservable();
    constructor(
        //private connectionService:ConnectionService
    ) {

    }

    ngOnInit() {
        console.log("init widget");
    }

    setDecisionSpaceIdAndInit(id) {
        this.decisionspaceId = id;
        this._widgets.next(WIDGETS[id]);
        /*this.connectionService.call('udm.backend.getWidgets', [id]).then(res => {
            this._widgets.next(res);
        }).catch(err => {
            console.log(err);
        });*/
    }
    addVisualization(widget) {
        let widgets = this._widgets.getValue();
            widgets.push(widget);
            this._widgets.next(widgets);
        /*this.connectionService.call('udm.backend.createWidget', [this.decisionspaceId, widget]).then(res => {
            let widgets = this._widgets.getValue();
            widgets.push(res);
            this._widgets.next(widgets);
        }).catch(err => {
            console.log(err);
        });*/
    }    
}   