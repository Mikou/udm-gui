import { Component, Input } from '@angular/core';

import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';


@Component({
  selector: 'ud2d-featurelistitem',
  template: `
    <div [makeDraggable]="item"><div class="dragHandler">{{item.name}}</div></div>
  `
})

export class FeaturelistitemComponent {
  @Input() item: string;
}