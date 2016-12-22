import {Component} from '@angular/core';

@Component({
    selector: 'ud2d-comment',
    template: `
      <h3>Write a comment here</h3>
 
      <p>
        <label>topic:</label>
        <input type="text" />
      </p>
      <p>
        <textarea></textarea>
      </p>
      <p>
        <button>Send</button>
      </p>
    `
})
export class CommentFeatureComponent {
    constructor() {
        console.log("Feature component loaded");
    }
}