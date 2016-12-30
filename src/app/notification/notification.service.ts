import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { List } from 'immutable';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
    private _messages: BehaviorSubject<List<Notification>> = new BehaviorSubject<List<Notification>>(List([]));
    public messages: Observable<List<Notification>> = this._messages.asObservable();
    constructor() {
    }

    notify(message:string, type?:string) {
        let notification:Notification = new Notification();
        notification.message = message;
        notification.date = new Date();
        /* types = 
            info
            warning
            error
            success
            (it's a simple string litteral for now)
        */    
        notification.type = (type) ? type: 'info';

        let arr:Notification[] = this._messages.getValue().toArray();
        arr.unshift(notification);
         
        this._messages.next(List(arr));
    }

    clear() {
        this._messages.next(List([]));
    }
}