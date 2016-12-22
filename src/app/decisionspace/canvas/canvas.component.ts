import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MakeDroppable } from '../shared/draggable/make-droppable.directive';
import { WidgetlistComponent } from './widget/widgetlist.component'

@Component({
  selector: 'ud2d-canvas',
  styles:[`
  .canvas-content {
  }
  `],
  template: `
    <h2>{{title}}</h2>
    <div class='canvas-content' makeDroppable (dropped)="widgetlist.droppedWidget($event)">
      <ud2d-widgetlist [decisionspaceId]="decisionspaceId" #widgetlist></ud2d-widgetlist>
    </div>
  `
})

export class CanvasComponent {
  @Input() decisionspaceId:string
  
  title = 'canvas';

  constructor() {
  }

  ngOnInit() {
    console.log(this.decisionspaceId);
  }
}
