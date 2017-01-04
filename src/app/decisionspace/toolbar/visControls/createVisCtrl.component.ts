import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService }        from '../../../socketFactory/connection.service';
import { SecurityService }          from '../../../security/security.service';
import { VisCtrlService }           from './visCtrl.service';
import { VisCtrl }                  from './visCtrl.model';
@Component({
    selector: 'udm-createVisCtrl',
    template: `
        <h4>Import</h4>
        <p><label for="name">Name</label><input id="name" name="name" type="text" [(ngModel)]="name" /></p>
        <p><label for="url">Url</label><input id="url" name="url" type="text" [(ngModel)]="url" /></p>
        <button (click)="onClick()">Submit</button>
      `
})
export class CreateVisCtrlComponent implements OnInit {

    name:string;
    url:string;

    constructor(
        private _securitySvc: SecurityService,
        private visCtrlService:VisCtrlService
    ) {
    }

    ngOnInit() {

    }

    onClick() {
        let visCtrl:VisCtrl = {
            name: this.name,
            url: this.url,
            type: 'VISCTRL'
        };
        this.visCtrlService.create(visCtrl);
        return Promise.resolve("decision space created");
    }
}