import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecisionspaceService } from './decisionspace.service';
import { NotificationService } from '../notification/notification.service';
import { DecisionSpace } from './models/decisionspace.model';
import { User } from '../security/user.model';
import { SecurityService } from '../security/security.service';
@Component({
    selector: 'ud2d-register',
    template: `
        <h2>create a new decision space</h2>
        <form (ngSubmit)="onSubmit(decisionspace)" [formGroup]="decisionspace">
            <p><label for="name">Name</label><input id="name" name="name" type="text" formControlName="name" /></p>
            <p><label for="description">Description</label><input id="description" name="description" type="text" formControlName="description" /></p>
            <p><label for="published">Make public</label><input id="published" name="published" type="checkbox" [checked]="decisionspace.published" formControlName="published" /></p>
            
            <button type="submit" [disabled]="decisionspace.invalid">Create</button>
        </form>
      `
})
export class CreateDecisionspaceComponent implements OnInit {

    decisionspace:FormGroup;

    constructor(
        private _decisionspaceService: DecisionspaceService,
        private notificationService: NotificationService,
        private securityService:SecurityService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.decisionspace = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
            description: new FormControl('', []),
            published: new FormControl(false)
        });
    }

    onSubmit({ value, valid }: { value: DecisionSpace, valid: boolean }) {
        let user:User = this.securityService.getCurrentUser();
        if(!user) {
            this.notificationService.notify('Only logged in user are allowed to create new decision spaces', 'error');
            return;
        } else {
            value.author = user.id;
        }
        
        this._decisionspaceService.create(value).then( (createdSpace:DecisionSpace) => {
            console.log(createdSpace);
            this.notificationService.notify('The new decision space \'' + createdSpace.title +'\' was created.', 'success');
            let link = ['/decisionspaces'];
            this.router.navigate(link);
        }).catch( err => {
            this.notificationService.notify('Failed to create the decision space', 'error');
            console.log("ERR ->", err)
        });
    }
}