import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConnectorService} from '../../../connector/connector.service';
import { Injectable }      from '@angular/core';
import { List }            from 'immutable';
import { Observable }      from 'rxjs/Observable';
import { FeatureCtrl }         from './featureCtrl.model';

@Injectable()
export class FeatureCtrlService {
    private _visCtrls: BehaviorSubject<List<FeatureCtrl>> = new BehaviorSubject(List([]));
    public visCtrls: Observable<List<FeatureCtrl>> = this._visCtrls.asObservable();

    constructor(
        private connectorService: ConnectorService
    ) {
        //this._visCtrls.next(List<VisCtrl>(VISCTRLS))
    }

    loadFeatureCtrls():Observable<List<FeatureCtrl>> {
        this.connectorService.call('backend.featurectrl.retrieve', []).then( (res:Array<FeatureCtrl>) => {
            console.log(res);
            let l:List<FeatureCtrl> = List(res);
            this._visCtrls.next(l);
        }).catch(err => {
        });

        return this.visCtrls;
    }
}