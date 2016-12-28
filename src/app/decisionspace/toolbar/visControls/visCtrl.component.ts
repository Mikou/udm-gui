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
    <div [makeDraggable]="item"><div class="dragHandler">{{item.name}}</div></div>
  `
})

export class VisCtrlComponent {
  @Input() item: string;

  constructor() {}
}