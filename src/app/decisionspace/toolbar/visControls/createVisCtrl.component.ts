import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService }        from '../../../socketFactory/connection.service';
import { SecurityService }          from '../../../security/security.service';
import { VisCtrlService }           from './visCtrl.service';
import { VisCtrl }                  from './visCtrl.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NotificationService} from '../../../notification/notification.service';
@Component({
    selector: 'udm-createVisCtrl',
    template: `
        <h4>Import</h4>
        <form (ngSubmit)="onSubmit(visCtrl)" [formGroup]="visCtrl">
            <p><label for="title">Title</label><input id="title" name="title" type="text" formControlName="title" /></p>
            <p><label for="description">Description</label><input id="description" name="description" type="text" formControlName="description" /></p>
            <p><label for="url">Url</label><input id="url" name="url" type="text" formControlName="url" /></p>
            <button type="submit" [disabled]="visCtrl.invalid">Submit</button>
        </form>
      `
})
export class CreateVisCtrlComponent implements OnInit {
    visCtrl: FormGroup;

    constructor(
        private _securitySvc: SecurityService,
        private visCtrlService:VisCtrlService,
        private notificationService:NotificationService
    ) {
    }
    ngOnInit() {
        this.visCtrl = new FormGroup({
            title: new FormControl('', [Validators.minLength(3)]),
            description: new FormControl('', [Validators.minLength(3)]),
            url: new FormControl('', [])
        });
    }
    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        this.visCtrlService.create(value, this._securitySvc.getCurrentUser().id).then( visCtrl => {
            this.notificationService.notify("The visualization control with name " + name + " was created");
        }).catch(err => this.notificationService.notify("Could not create the visualization control"));
        return Promise.resolve("decision space created");
    }
}