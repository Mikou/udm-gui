import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from './comment.model';
import { DecisionspaceService } from '../../../decisionspace.service';
import { ConnectorService } from '../../../../connector/connector.service';
import { SecurityService } from '../../../../security/security.service';
import { FeatureComponent } from './featureComponent.interface';
@Component({
    selector: 'ud2d-comment',
    template: `
      <h3>Write a comment here</h3>
      <form (ngSubmit)="onSubmit(comment)" [formGroup]="comment">
      <p>
        <label for="topic">topic:</label>
        <input id="topic" name="topic" formControlName="topic" type="text" />
      </p>
      <p>
        <label for="message">message</label>
        <textarea id="message" name="message" formControlName="message"></textarea>
      </p>
      <p>
        <button type="submit" [disabled]="comment.invalid">Send</button>
      </p>
      </form>
    `
})
export class CommentFeatureComponent implements OnInit, FeatureComponent {

    comment: FormGroup;

    constructor(
      private decisionspaceService:DecisionspaceService,
      private connectorService: ConnectorService,
      private securityService: SecurityService
    ) {}

    ngOnInit() {
      this.comment = new FormGroup({
        topic: new FormControl(''),
        message: new FormControl('')
      });
    }

    onSubmit({ value, valid }: { value: Comment, valid: boolean }) {
      const comment = value;
      comment.author = 1;
      this.connectorService.call('udm.backend.createComment', [
        comment, 
        this.decisionspaceService.getDecisionspaceId(), 
        this.securityService.getCurrentUser().id]).then (comment => {
        
        console.log("success", comment);
      }).catch( err => {
        console.log("failuer", err);
      });

    }
}