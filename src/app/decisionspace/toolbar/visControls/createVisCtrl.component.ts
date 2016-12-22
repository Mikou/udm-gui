import{ Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../../../socketFactory/connection.service';
import { SecurityService } from '../../../security/security.service';

@Component({
    selector: 'udm-createVisCtrl',
    template: `
        <h4>create a new visualization control</h4>
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
        //private _connectionSvc: ConnectionService
    ) {
    }

    ngOnInit() {

    }

    onClick() {

        let visCtrl:any = {
            name: this.name,
            url: this.url,
            userid: 1
        };

        /*this._connectionSvc.call('udm.backend.visCtrlRegistration', [visCtrl]).then((data) => {
            console.log("data", data);
            
        }).catch( (err) => {
            console.log("ERROR", err);
        });*/
        return Promise.resolve("decision space created");

    }
}