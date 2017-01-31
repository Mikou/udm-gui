import { Component, Input, OnChanges } from '@angular/core';
import { MakeDraggable } from '../../shared/draggable/make-draggable.directive';

@Component({
  selector: 'udm-featurectrl',
  styles: [`
    p {
      margin:0px;
    }
  `],
  template: `
    <div [makeDraggable]="featureCtrl">
      <div class="dragHandler">
        <h4>{{featureCtrl.title}}</h4>
        <p>{{featureCtrl.description}}</p>
      </div>
    </div>
  `
})
export class FeatureCtrlComponent {
  @Input() featureCtrl: string;


}