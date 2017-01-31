import {Component} from '@angular/core';
import { FeatureComponent } from './featureComponent.interface';

@Component({
    selector: 'ud2d-comment-archive',
    template: `
      <h3>Comments archive</h3>
      <p><strong>comment 1</strong>, author: John, date: today</p>
      <p><strong>comment 2</strong>, author: Bob, date:today</p>
      <p><strong>comment 3</strong>, author: Alice, date:today</p>
    `
})
export class CommentarchiveComponent implements FeatureComponent {
    constructor() {
    }
}