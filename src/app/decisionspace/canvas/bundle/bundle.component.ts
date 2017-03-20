import { 
    OnInit, 
    Component, 
    ComponentFactoryResolver,
    ComponentRef,
    ViewChild,
    ViewContainerRef,
    Input, 
    Output, 
    EventEmitter,
    NgZone
} from '@angular/core';
import { BundleService }           from './bundle.service';
import { DomSanitizer }            from '@angular/platform-browser';
import { MakeDraggable }           from '../../shared/draggable/make-draggable.directive';
import { VisualizationComponent }  from './visualization.component';

import { FeatureCtrl }             from '../../toolbar/featureControls/featureCtrl.model';
import { Bundle }                  from '../../models/bundle.model';
import { FeatureComponent }        from './featureComponents/feature.component';
import { ConnectorService }        from '../../../connector/connector.service';
import { NotificationService }        from '../../../notification/notification.service';

import {List}                      from 'immutable';
@Component({
  selector: 'udm-bundle',
  styles: [`
    .header{
        color: #fff;
        padding: 5px;
        position:relative;
        overflow:hidden;
        background-color: lightslategray;
    }  
    .header .controls {
        position:absolute;
        padding:5px;
        right:0;
        top:0    
    }

    .header .controls a {
        padding: 2xp 5px;
        cursor: pointer;
    }
  `],
  template: `
  
    <div [makeDraggable]="bundle" makeDroppable (dropped)="droppedFeature($event)">
        <div class="header dragHandler">
            <h4>{{bundle.title}}, id: {{bundle.id}}</h4>
            <div class="controls">
                <a href="" class="fa fa-inverse fa-arrow-up"></a> | 
                <a href="" class="fa fa-inverse fa-arrow-down"></a> | 
                <a class="fa fa-inverse fa-trash" (click)="deletebundle(bundle.id)"></a>
            </div>
        </div>
        <p>{{bundle.description}}</p>

        <div class="content">
            <div #target></div>
        </div>
    </div>
  `
})
export class BundleComponent {
    @Input() bundle: Bundle;
    @Input() decisionspaceId: number;
    @Output() deletebundleNotify: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('target', {read: ViewContainerRef}) target:any;
    featuresDict:Object;

    constructor(
        private domSanitizer: DomSanitizer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private bundleService: BundleService,
        private connectorService: ConnectorService,
        private notificationService: NotificationService,
        private zone:NgZone
    ) {
        this.featuresDict = {};
    }


    ngOnInit() {
        let cptType:any;
        /* load the visualization */
        const factory = this.componentFactoryResolver.resolveComponentFactory(VisualizationComponent);
        const cmpRef:ComponentRef<VisualizationComponent> = this.target.createComponent(factory);
        cmpRef.instance.visualization = this.bundle.visualization;    
        
        /* load the features */
        if(this.bundle.features) {
            this.bundle.features.forEach( (feature) => {
                const factory = this.componentFactoryResolver.resolveComponentFactory(FeatureComponent);
                const cmpRef:ComponentRef<FeatureComponent> = this.target.createComponent(factory);
                cmpRef.instance.decisionspaceId = this.decisionspaceId;
                cmpRef.instance.bundleId = this.bundle.id;
                cmpRef.instance.feature = feature;
                this.featuresDict[feature["id"]] = cmpRef;
                cmpRef.instance.deleteFeature.subscribe( featureId => {
                    this.connectorService.call("backend.feature.removefeature", [this.decisionspaceId, this.bundle.id, feature["id"]])
                    .then( (deletedFeatureId) => {
                        const features = this.bundle.features.filter(feature => deletedFeatureId != featureId)
                        this.featuresDict[featureId].destroy();
                    })
                    .catch( err => {
                        console.log(err);
                        this.notificationService.notify("could not delete the feature ", "error");
                    })
                })
                cmpRef.instance.moveFeatureUp.subscribe( (featureId) => {
                    const featureToMove = this.bundle.features.filter( (feature) => feature["id"] == featureId)[0];
                    const featureToSwap = this.bundle.features.filter( (feature) => feature["gravity"] == featureToMove["gravity"] - 1)

                    console.log(featureToSwap[0]);
                })
                cmpRef.instance.moveFeatureDown.subscribe( (featureId) => {
                    const featureToMove = this.bundle.features.filter( (feature) => feature["id"] == featureId);
                    console.log("SWAP FEATURES");
                })
            });
        }
    }

    onDeleteFeature(event) {
        console.log("DELETE FEATURE");
    }

    deletebundle(bundleId:number) {
        this.deletebundleNotify.emit(bundleId);
    }

    droppedFeature(src:FeatureCtrl) {
        let len;

        if(this.bundle.features) {
            console.log(this.bundle.features);
            len = this.bundle.features.length
        } else {
            len = 0;
        }
        this.bundleService.addFeature(this.decisionspaceId, this.bundle.id, src, len)
        .then( (featureId:number) => {

            const id = len;
            const factory = this.componentFactoryResolver.resolveComponentFactory(FeatureComponent);
            const cmpRef:ComponentRef<FeatureComponent> = this.target.createComponent(factory);
            cmpRef.instance.decisionspaceId = this.decisionspaceId;
            cmpRef.instance.bundleId = this.bundle.id;
            cmpRef.instance.feature = src;
            this.featuresDict[id] = cmpRef;
            cmpRef.instance.deleteFeature.subscribe( featureId => {
                this.connectorService.call("backend.feature.removefeature", [this.decisionspaceId, this.bundle.id, id])
                .then( (deletedFeatureId) => {
                    const features = this.bundle.features.filter(feature => deletedFeatureId != featureId)
                    this.featuresDict[featureId].destroy();
                })
                .catch( err => {
                    console.log(err);
                    this.notificationService.notify("could not delete the feature ", "error");
                })
            });
            /*let featureComponent = this.getFeatureComponentType(src.componentType);
            const factory = this.componentFactoryResolver.resolveComponentFactory(featureComponent);
            const cmpRef:ComponentRef<FeatureComponent> = this.target.createComponent(factory);
            cmpRef.instance.decisionspaceId = this.decisionspaceId;
            cmpRef.instance.bundleId = this.bundle.id;
            cmpRef.instance.payload  = null;
            if(cmpRef.instance['onDeploy'])
                cmpRef.instance['onDeploy']();*/ 
        })
        .catch( err => console.log(err));
    }
}