import { Component } from '@angular/core';
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
    private connection:any;
    constructor() {
        
        //const url:string = "ws://127.0.0.1:8082/ws";
        let url:string;
        if (document.location.host === 'udm.herokuapp.com') {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "//udm.herokuapp.com/ws";
        } else {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "//" +
                   document.location.host + "/ws";
        }

        this.connection = new autobahn.Connection({
            url:url,
            realm: 'realm1'
        });

        this.connection.open();
        this.connection.onclose = function (reason, details) {
            if(reason == "unreachable") {
                const msg = "The server application is unreachable. Maybe it is idle?";
                console.log(msg);
                //notificationService.notify(msg);
            }
        };

        this.log();
    }

    log() {
        if(this.send && this.connection.isOpen) {
            this.connection.session.call('udm.backend.test', ["message from angular"]).then( (data) => {
                this.logs.push(data);
            })
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