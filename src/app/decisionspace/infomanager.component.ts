import { Component, NgZone, OnInit, Input, Output, EventEmitter }      from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DsHeader } from './models/dsHeader.model';
import { NotificationService } from './../notification/notification.service';
import { ConnectorService } from './../connector/connector.service';

@Component({
    selector: 'udm-infomanager',
    styles: [
        `
        .delete {
            color:#eee;
            background-color:#a00;
        }
        `
    ],
    template: `
        <h3>Information management</h3>

        <form (ngSubmit)="onSubmit(dsHeader)" [formGroup]="dsHeader">
            <p>
                <label for="title">title: </label><input id="title" name="title" type="text" formControlName="title" placeholder="{{title}}"/>
            </p>
            <p>
                <label for="description">description: </label>
                <input id="description" name="description" type="text" formControlName="description" placeholder="{{description}}"/>
            </p>
            <p>
                <label for="published">published: </label>
                <input id="published" name="published" type="checkbox" formControlName="published" placeholder="{{published}}"/>
            </p>
           <button type="submit" [disabled]="dsHeader.invalid">Save changes</button>
        </form>

        <form (ngSubmit)="onDelete(dsHeader)" [formGroup]="dsHeader">
            <button type="submit" class="delete" [disabled]="">Delete this decision space</button>
        </form>
    `
})
export class InfomanagerComponent implements OnInit {

    @Input() decisionspaceId: number;
    @Input() title: string;
    @Input() description: string;
    @Input() published: boolean;

    @Output() headerUpdate: EventEmitter<any> = new EventEmitter();
    dsHeader: FormGroup
    constructor(
        private _notificationSvc: NotificationService,
        private connectorService: ConnectorService
    ) {}

    ngOnInit() {
        this.dsHeader = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            description: new FormControl('', []),
            published: new FormControl('', []),
        });
    }


    onSubmit({ value, valid }: { value: DsHeader, valid: boolean }) {
        value["id"] = this.decisionspaceId;
        value["published"] = false;
        
        if(valid) {
            this.connectorService.call('backend.decisionspace.update', [{}, value])
                .then( r => {
                    this.headerUpdate.emit(value);
                })
        } else {
            this._notificationSvc.notify('Cannot register user. Form data is invalid', 'error');
        }
    }


}