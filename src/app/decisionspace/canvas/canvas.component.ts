import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import { MakeDroppable } from '../shared/draggable/make-droppable.directive';
import { BundlesComponent } from './bundle/bundles.component';
import { Bundle } from '../models/bundle.model';
import { List } from 'immutable';

@Component({
  selector: 'udm-canvas',
  styles:[`
  .canvas-content {
  }
  udm-bundlelist {
    display:block;
  }
  `],
  template: `
    <div class='canvas-content' makeDroppable (dropped)="bundlelist.droppedbundle($event)">
      <udm-bundles [decisionspaceId]="decisionspaceId" [bundles]="bundles" #bundlelist></udm-bundles>
    </div>
  `
})
export class CanvasComponent {
  @Input() decisionspaceId: number;
  @Input() bundles: List<Bundle>;

  constructor() {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.bundles = changes["bundles"].currentValue;
  }

  ngOnInit() {
  }

}
