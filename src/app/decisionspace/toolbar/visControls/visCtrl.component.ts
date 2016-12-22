import { Component, Input } from '@angular/core';

import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';


@Component({
  selector: 'udm-visctrl',
  styles: [`
    p {
      margin:0
    }
  `],
  template: `
    <p [makeDraggable]="item"><li>{{item.name}}</li></p>
  `
})

export class VisCtrlComponent {
  @Input() item: string;
}