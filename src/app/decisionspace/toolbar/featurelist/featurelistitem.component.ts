import { Component, Input } from '@angular/core';

import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';


@Component({
  selector: 'udm-featurelistitem',
  styles: [],
  template: `
    <div [makeDraggable]="item"><div class="dragHandler">{{item.name}}</div></div>
  `
})

export class FeaturelistitemComponent {
  @Input() item: string;
}