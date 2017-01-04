import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MakeDroppable } from '../shared/draggable/make-droppable.directive';
import { WidgetlistComponent } from './widget/widgetlist.component'

@Component({
  selector: 'udm-canvas',
  styles:[`
  .canvas-content {
  }
  udm-widgetlist {
    display:block;
  }
  `],
  template: `
    <div class='canvas-content' makeDroppable (dropped)="widgetlist.droppedWidget($event)">
      <udm-widgetlist [decisionspaceId]="decisionspaceId" #widgetlist></udm-widgetlist>
    </div>
  `
})
export class CanvasComponent {
  @Input() decisionspaceId:string

  constructor() {
  }

  ngOnInit() {
    console.log(this.decisionspaceId);
  }
}
