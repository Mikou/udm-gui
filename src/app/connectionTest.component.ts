import { Component } from '@angular/core';
import { ConnectorService } from './connector/connector.service';
import { NotificationService } from './notification/notification.service';

let autobahn = require('autobahn');

@Component({
    selector: 'udm-connectiontest',
    template: `
    
        <p>This page shows messages fetched from the backend</p>

        <button (click)="toggle()">start/stop</button>
        <button (click)="clear()">clear logs</button>
        
        <ul><li *ngFor="let log of logs">{{ log }}</li></ul>   
    `
})
export class ConnectionTestComponent {
    private logs:string[] = [];
    private send:boolean = false;
    constructor(
        private connectorService:ConnectorService,
        private notificationService:NotificationService
    ) {
        this.log();
    }

    log() {
        if(this.send) {
            this.notificationService.notify("send");
            this.connectorService.call('udm.backend.test', ["message from angular"]).then( (data) => {
                this.logs.push(data);
            }).catch( (err) => {
                console.log(err);
            });
        }

        setTimeout( () => {
            this.log();
        }, 1000);
    }

    toggle() {
        this.send = !this.send;
    }

    clear() {
        this.logs = [];
    }
}