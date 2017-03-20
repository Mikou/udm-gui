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
import { Bundle }                  from '../../../models/bundle.model';
import { CommentFormComponent }    from './commentForm.component';
import { CommentArchiveComponent } from './commentArchive.component';
import { Feature }                 from './feature.interface'
@Component({
    selector: 'udm-feature',
    styles: [`
        .header {
            display:block;
            overflow:hidden;
            position:relative;
            padding:5px;
            background-color: #ddeeee;
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
    <div>
        <div class= "header">
            {{headerTitle}}
            <div class="controls">
                <a class="fa fa-arrow-up"   (click)="moveUp()"></a> | 
                <a class="fa fa-arrow-down" (click)="moveDown()"></a> | 
                <a class="fa fa-trash"      (click)="delete()"></a>
            </div>
        </div>
        <div class="content">
            <div #target></div>
        </div>
    </div>
    `
})
export class FeatureComponent implements OnInit {
    @Input() bundle: Bundle;

    @Input() decisionspaceId:number;
    @Input() bundleId:number;
    @Input() feature:Object;
    @Output() deleteFeature: EventEmitter<number> = new EventEmitter<number>();

    @Output() moveFeatureUp: EventEmitter<number> = new EventEmitter<number>();
    @Output() moveFeatureDown: EventEmitter<number> = new EventEmitter<number>();

    headerTitle:string;
    cmpRef:ComponentRef<Feature>; 
    featureId: number;
    @ViewChild('target', {read: ViewContainerRef}) target:any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,

    ) {

    }

    private swapGravity() {

    }

    private moveUp() {
        this.moveFeatureUp.emit(this.featureId); 
    }

    private moveDown() {
        this.moveFeatureDown.emit(this.featureId); 
    }

    delete() {
        this.deleteFeature.emit(this.featureId);
    }

    private setHeaderTitle(componentTitle:string) {
        switch(componentTitle) {
            case "COMMENT_FORM":
                return "comment form";
            case "COMMENT_ARCHIVE":
                return "comment archive";
            default:
                return "no title";
        }
    }

    private getFeatureComponentType(componentType:string) {
        let featureComponent:any;
        if (componentType == 'COMMENT_FORM') {
            featureComponent = CommentFormComponent;
        } else if(componentType == 'COMMENT_ARCHIVE') {
            featureComponent = CommentArchiveComponent;        }
        return featureComponent;
    }

    ngOnInit() {
        this.headerTitle = this.setHeaderTitle(this.feature["componentType"]);
        let featureComponent = this.getFeatureComponentType(this.feature["componentType"]);
        const factory = this.componentFactoryResolver.resolveComponentFactory(featureComponent);
        this.cmpRef = this.target.createComponent(factory);
        this.featureId = this.feature["id"];
        this.cmpRef.instance.decisionspaceId = this.decisionspaceId;
        this.cmpRef.instance.bundleId = this.bundleId;
        if(this.feature && !(this.feature["type"] == "featureCtrl")) {
            this.cmpRef.instance.payload = this.feature["payload"];
        } else {
            this.cmpRef.instance.onDeploy();
        }
    }

}