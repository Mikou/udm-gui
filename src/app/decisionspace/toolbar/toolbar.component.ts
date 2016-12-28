import { Component } from '@angular/core';
import {VislistComponent} from './visControls/vislist.component'

@Component({
  selector: 'udm-toolbar',
  template: `
    <h2>{{title}}</h2>
    <udm-visctrls></udm-visctrls>
    <udm-featurelist></udm-featurelist>
  `
})

export class ToolbarComponent {
  title = 'toolbar';
}