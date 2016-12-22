import { Component, Input } from '@angular/core';

import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';


@Component({
  selector: 'ud2d-featurelistitem',
  template: `
    <p [makeDraggable]="item"><li>{{item.name}}</li></p>
  `
})

export class FeaturelistitemComponent {
  @Input() item: string;
}