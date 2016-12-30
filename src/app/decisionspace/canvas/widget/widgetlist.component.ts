import { Component, ViewChild,ViewContainerRef, Compiler, ComponentFactoryResolver, ComponentRef, Input, OnInit, NgZone } from '@angular/core';
import { CommentFeatureComponent } from './featureComponents/comment.component';
import { WidgetComponent } from './widget.component';
import { ActivatedRoute } from '@angular/router';

import { WidgetService } from './widget.service';
import { VisCtrl } from './../../toolbar/visControls/visCtrl.model';

@Component({
  selector: 'udm-widgetlist',
    styles: [`
      udm-widget {
          display:block;
          background-color:#fff;
          padding:10px;
          margin:10px 0;
          border:1px solid #ccf;
      }
  `],
  template: `
    <h3>{{title}}</h3>
    <udm-widget
      *ngFor="let widgetitem of widgetitems"
      [item]="widgetitem"
      makeDroppable (dropped)="droppedWidget($event, widgetitem)"
      (deleteWidgetNotify)="onDelete($event)"
      #target>
    </udm-widget>
  `
})

export class WidgetlistComponent implements OnInit {
  @Input() decisionspaceId:number;
  @ViewChild('target', {read: ViewContainerRef}) target:any;
  // DYNAMIC LOADING COMPONENT:
  //http://stackoverflow.com/questions/36325212/angular-2-dynamic-tabs-with-user-click-chosen-components/36325468#36325468
  title = 'widget list';
  cmpRef:ComponentRef<any>;
  widgetitems:any;
  constructor(
    private compiler: Compiler ,
    private componentFactoryResolver: ComponentFactoryResolver,
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private zone:NgZone
    ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.widgetService.setDecisionSpaceIdAndInit(params["id"]);
      this.widgetService.widgets.subscribe( (widgets) => {
        this.zone.run( () => this.widgetitems = widgets );
      });
    });
  }
  onDelete(widgetId:number):void {
    this.widgetitems.forEach((widget:any, index:any, object:any) => {
        if(widget.id == widgetId) object.splice(index,1);
    });
  }
  moveRow(src:number, trg:number) {
    if(src > trg) {
      for(let i = trg; i<src; i++)
        this.widgetitems[i].order++;
    } else {
      for (let i = src + 1; i <= trg; i++) {
        this.widgetitems[i].order--;
      }
    }
    this.widgetitems[src].order = trg;
    this.widgetitems.sort((a:any, b:any) => a.order - b.order);
  }
  deployVisualization(name:string, url:string) {
    let gravity = this.widgetitems.length;
    this.widgetService.addVisualization({ 
      id:this.widgetitems.length, 
      type:'widget', 
      cptType:'visualization', 
      name:name, gravity:gravity,
      visualization: {
        url:url
      }
    });
  }
  deployFeature(src:any) {
    let order = this.widgetitems.length;
    this.widgetitems.push({ id:this.widgetitems.length, type:'widget', cptType:src.cptType, name:src.name, order:order,
      config: src.config
    });
  }
  droppedWidget(src: any, trg: any) {
    console.log("DROPPED STUFF", src);
    if(src.type === 'VISCTRL') {
      this.deployVisualization(src.name, src.url);
    } else if(src.type === 'featureItem') {
      this.deployFeature(src);
    }
    else if(src.type === 'widget') {
      this.moveRow(src.gravity, trg.gravity);
    }
  };
}