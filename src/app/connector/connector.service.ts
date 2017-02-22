import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { List } from 'immutable';
import { SubscriptionMessage } from './subscriptionMessage.model';
const autobahn = require('autobahn');

export class ConnectorService {
    private connection:any;
    private connected:boolean;
    private subscribers = {};
    private _subscriptionMessage: BehaviorSubject<List<SubscriptionMessage>> = new BehaviorSubject(List([]));
    public subscriptionMessage: Observable<List<SubscriptionMessage>> = this._subscriptionMessage.asObservable();

    /*private _comments: BehaviorSubject<List<SubscriptionMessage>> = new BehaviorSubject(List([]));
    public comments: Observable<List<SubscriptionMessage>> = this._comments.asObservable();*/


    constructor(
    ) {
        let url:string;
        const subscribers = this.subscribers;
        if (document.location.host === 'mikou.github.io') {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "://udm.herokuapp.com/ws";
        } else {
            url = (document.location.protocol === "http:" ? "ws" : "wss") + "://" +
                   document.location.hostname + ":" + 8089 + "/ws";
        }
        this.connection = new autobahn.Connection({url: url, realm: 'realm1'});
        this.connection.open();
        this.connection.onopen = function (session) {
            this.connected = true;
            session.subscribe("frontend.feature.addedContent", function(res) {
                if("newcomment" in subscribers) {
                    subscribers["newcomment"].forEach( obj => {
                        obj.fn(obj.scope, res[0], res[1], res[2]);
                    });
                }
            });
        }
        this.connection.onclose = function (reason, details) {
            if(reason == "unreachable") {
                const msg = "The server application is unreachable. Maybe it is idle?";
            }
        // connection closed, lost or unable to connect
        };

   }

   subscribe(action:string, scope:Object, fn:Function) {
        if(!this.subscribers[action])
            this.subscribers[action] = [];
        this.subscribers[action].push({scope: scope, fn: fn});
   }

   call(endpoint:string, args:any): Promise<any> {
       let connection = this.connection;
       if(!connection.isOpen) {
       let promise = new Promise( (resolve, reject) => {
                let delay:number = 10;
                function tryCall () {
                    if(connection.isOpen) {
                        connection.session.call(endpoint, args).then( data => {
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