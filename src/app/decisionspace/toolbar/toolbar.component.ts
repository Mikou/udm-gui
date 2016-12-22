import { Component } from '@angular/core';
import {VislistComponent} from './visControls/vislist.component'

@Component({
  selector: 'udm-toolbar',
  template: `
    <h2>{{title}}</h2>
    <ud2d-visctrls></ud2d-visctrls>
    <ud2d-featurelist></ud2d-featurelist>
  `
})

export class ToolbarComponent {
  title = 'toolbar';
}