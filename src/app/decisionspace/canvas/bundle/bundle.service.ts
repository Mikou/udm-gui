import { OnInit, Injectable } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { List }               from 'immutable';
import { Observable }         from "rxjs/Observable";
import { ConnectorService }   from '../../../connector/connector.service'
import { FeatureCtrl }        from '../../toolbar/featureControls/featureCtrl.model';
import { VisCtrl }            from '../../toolbar/visControls/visCtrl.model';
import { Bundle }             from './bundle.model';
import { Visualization }      from './visualization.model';


@Injectable()
export class BundleService {

    private decisionspaceId:number = null;
    private _bundles: BehaviorSubject<List<Bundle>> = new BehaviorSubject(List([]));
    public bundles: Observable<List<Bundle>> = this._bundles.asObservable();
    constructor(
        private connectorService:ConnectorService
    ) {

    }

    ngOnInit() {
        console.log("init bundle");
    }

    setBundles(bundles:List<Bundle>) {
        this._bundles.next(bundles);
    }

    addFeature(decisionspaceId:number, bundleId:number, featureCtrl:FeatureCtrl):Promise<number> {
        return new Promise<number>((resolve, reject) => {
        this.connectorService.call('backend.bundle.addFeature', [decisionspaceId, bundleId, featureCtrl])
            .then( (featureId:number) => {
                resolve(featureId);
            })
            .catch(err => {
                reject(err);
            });
        })
    }

    addBundleWithVisualization(decisionspaceId:any, visCtrl:VisCtrl):Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const visualization = new Visualization();
            visualization.url = visCtrl.url;
            const bundle = new Bundle();
            bundle.title = "no name";
            bundle.description = "";
            bundle.author = 1;
            bundle.gravity = this._bundles.getValue().size;
            bundle.visualization = visualization;
            bundle.features = List([]);
            this.connectorService.call('backend.bundle.create', [decisionspaceId, bundle])
                .then( (bundle:any) => {
                    const bundles:List<Bundle> = this._bundles.getValue();
                    const arr = bundles.toArray();
                    arr.push(bundle);
                    const newBundleList:List<Bundle> = List(arr);
                    this._bundles.next(newBundleList);
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }
}   