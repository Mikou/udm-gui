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
} from '@angular/core';
import { BundleService } from './bundle.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';
import { VisualizationComponent } from './visualization.component';
import { CommentFeatureComponent } from './featureComponents/comment.component';
import { CommentarchiveComponent } from './featureComponents/commentarchive.component';
import { FeatureCtrl } from '../../toolbar/featureControls/featureCtrl.model';
import { Bundle } from '../../models/bundle.model';
import { FeatureComponent } from './featureComponents/featureComponent.interface';

@Component({
  selector: 'udm-bundle',
  styles: [`
    .header{
        color: #fff;
        padding: 1px 5px;
        background-color: lightslategray;
    }   
  `],
  template: `
    <div [makeDraggable]="bundle" makeDroppable (dropped)="droppedbundle($event)">
        <div class="header dragHandler">
            <h4>{{bundle.title}}</h4><button class="delete" (click)="deletebundle(bundle.id)">delete</button>
            <p>{{bundle.description}}</p>
        </div>
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

    constructor(
        private domSanitizer: DomSanitizer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private bundleService: BundleService
    ) {}

    ngOnInit() {
        let cptType:any;
        const factory = this.componentFactoryResolver.resolveComponentFactory(VisualizationComponent);
        const cmpRef:ComponentRef<VisualizationComponent> = this.target.createComponent(factory);
        cmpRef.instance.visualization = this.bundle.visualization;    

        if(this.bundle.features) {
            this.bundle.features.forEach( (feature) => {
                let featureComponent = this.getFeatureComponentType(feature.componentType);
                const factory = this.componentFactoryResolver.resolveComponentFactory(featureComponent);
                const cmpRef:ComponentRef<FeatureComponent> = this.target.createComponent(factory);
            });
        }
    }

    deletebundle(bundleId:number) {
        this.deletebundleNotify.emit(bundleId);
    }

    private getFeatureComponentType(componentType:string) {
        let featureComponent;
        if (componentType == 'COMMENT_FORM') {
            featureComponent = CommentFeatureComponent;
        } else if(componentType == 'COMMENT_ARCHIVE') {
            featureComponent = CommentarchiveComponent;
        }

        return featureComponent;
    }

    droppedbundle(src:FeatureCtrl) {
        this.bundleService.addFeature(this.decisionspaceId, this.bundle.id, src)
            .then( res => {
                let featureComponent = this.getFeatureComponentType(src.componentType);
                const factory = this.componentFactoryResolver.resolveComponentFactory(featureComponent);
                const cmpRef:ComponentRef<FeatureComponent> = this.target.createComponent(factory);
            })
            .catch( err => console.log(err));
    }
}