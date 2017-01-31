import { Component, ViewChild,ViewContainerRef, Compiler, ComponentFactoryResolver, ComponentRef, Input, OnInit, NgZone, SimpleChange } from '@angular/core';
import { CommentFeatureComponent } from './featureComponents/comment.component';
import { BundleComponent } from './bundle.component';
import { ActivatedRoute } from '@angular/router';
import { BundleService } from './bundle.service';
import { VisCtrl } from './../../toolbar/visControls/visCtrl.model';
import { FeatureCtrl } from './../../toolbar/featureControls/featureCtrl.model';
import { List } from 'immutable';
import { Bundle } from './bundle.model';

@Component({
  selector: 'udm-bundles',
    styles: [`
      udm-bundle {
          display:block;
          background-color:#fff;
          padding:10px;
          margin:10px 0;
          border:1px solid #ccf;
      }
  `],
  template: `
    <h3>{{title}}</h3>
    <udm-bundle
      *ngFor="let bundle of bundles"
      [bundle]="bundle" [decisionspaceId]="decisionspaceId"
      makeDroppable (dropped)="droppedbundle($event, bundle)"
      (deletebundleNotify)="onDelete($event)"
      #target>
    </udm-bundle>
  `
})

export class BundlesComponent implements OnInit {
  @Input() decisionspaceId:number;
  @Input() bundles:List<Bundle>;
  @ViewChild('target', {read: ViewContainerRef}) target:any;
  // DYNAMIC LOADING COMPONENT:
  //http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468
  title = 'bundle list';
  cmpRef:ComponentRef<any>;
  
  constructor(
    private compiler: Compiler ,
    private componentFactoryResolver: ComponentFactoryResolver,
    private bundleService: BundleService,
    private activatedRoute: ActivatedRoute,
    private zone:NgZone
    ) {}  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.bundleService.bundles.subscribe( (bundles:List<Bundle>) => {
        console.log(bundles);
        this.zone.run( () => this.bundles = bundles );
      })
    });
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    //this.bundles = <List<Bundle>> changes["bundles"].currentValue;

    this.bundleService.setBundles(<List<Bundle>> changes["bundles"].currentValue);
 
    //this.bundleService.setBundles(<List<Bundle>> changes["bundles"].currentValue);
  }
  onDelete(bundleId:number):void {
    this.bundles.forEach((bundle:any, index:any, object:any) => {
        if(bundle.id == bundleId) object.splice(index,1);
    });
  }
  moveRow(src:number, trg:number) {
    if(src > trg) {
      for(let i = trg; i<src; i++)
        this.bundles[i].order++;
    } else {
      for (let i = src + 1; i <= trg; i++) {
        this.bundles[i].order--;
      }
    }
    this.bundles[src].order = trg;
    this.bundles.sort((a:any, b:any) => a.order - b.order);
  }
  deployVisualization(name:string, url:string) {
    /*let gravity = this.bundles.length;
    this.bundleService.addVisualization({ 
      id:this.bundles.length, 
      type:'bundle', 
      cptType:'visualization', 
      name:name, gravity:gravity,
      visualization: {
        url:url
      }
    });*/
  }
  deployFeature(src:any) {
    /*let order = this.bundles.length;
    this.bundles.push({ id:this.bundles.size, type:'bundle', cptType:src.cptType, name:src.name, order:order,
      config: src.config
    });*/
  }
  droppedbundle(src: VisCtrl | FeatureCtrl, trg: any) {
    // only visualization bundles can be instantiated here
    const visCtrl:VisCtrl = <VisCtrl> src; 
    this.bundleService.addBundleWithVisualization(this.decisionspaceId, visCtrl);
  };
}