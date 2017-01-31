import { Component, Input, OnInit } from '@angular/core';
import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';
@Component({
  selector: 'udm-visctrl',
  styles: [`
    p {
      margin:0
    }
  `],
  template: `
    <div [makeDraggable]="visctrl"><div class="dragHandler">{{visctrl.title}}</div></div>
  `
})

export class VisCtrlComponent {
  @Input() visctrl: string;

  constructor(
  ) {}
  
}