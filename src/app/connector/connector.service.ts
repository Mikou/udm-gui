import { Injectable, Inject } from '@angular/core';
const autobahn = require('autobahn');

export class ConnectorService {
    private connection:any;
    private connected:boolean;
    constructor(
    ) {
        let url:string;
        if (document.location.host === 'mikou.github.io') {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "://udm.herokuapp.com/ws";
        } else {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "://" +
                   document.location.hostname + ":" + 8089 + "/ws";
        }
        this.connection = new autobahn.Connection({url: url, realm: 'realm1'});
        this.connection.open();
        this.connection.onopen = function () {
            this.connected = true;
        }
        this.connection.onclose = function (reason, details) {
            if(reason == "unreachable") {
                const msg = "The server application is unreachable. Maybe it is idle?";
                console.log(msg);
            }
        // connection closed, lost or unable to connect
        };
   }

   call(endpoint:string, args:any): Promise<any> {
       let connection = this.connection;
       if(!connection.isOpen) {
       let promise = new Promise( (resolve, reject) => {
                let delay:number = 10;
                function tryCall () {
                    if(connection.isOpen) {
                        connection.session.call(endpoint, args).then((data) => {
                            resolve(data);
                        }).catch((err) => {
                            let errorMessage = "Could not connect to the Server. Check that the server app is running";
                            console.log(errorMessage);
                            reject(err);
                        });
                    } else {
                        setTimeout(tryCall, delay = delay*2);
                    }
                }
                tryCall();
            });
            return promise;
        } else {
            return this.connection.session.call(endpoint, args);
        }
    }
}