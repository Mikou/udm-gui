import { OnInit, Component, NgZone, Pipe } from '@angular/core';
import { NotificationService } from './notification.service';
import { List } from 'immutable';
import { Notification } from './notification.model';

@Component({
    selector: 'udm-notification',
    styles: [`
        .notifications {
            padding:0;
        }
        .notification {
            list-style:none;
            border-left: 2px solid #111;
            padding-left:4px;
            margin-bottom:2px;
        }
        .success {
            border-left: 2px solid #0f0;
        }
        .info {
            border-left: 2px solid #00f;
        }
        .warning {
            border-left: 2px solid #f60;
        }
        .error {
            border-left: 2px solid #f00;
        }

    `],
    template: `
        <h4>logs:</h4>
        <ul class="notifications">
            <li *ngFor="let notification of notifications" class="notification {{notification.type}}">
                <span class="message"><strong>{{ notification.message }}</strong></span>
                <span class="date">{{notification.date}}</span>
            </li>
            <button (click)="clear()">clear</button>
        </ul>
    `
})
export class NotificationComponent implements OnInit {

    notifications:List<Notification> = List([]);

    constructor (
        private _notificationSvc: NotificationService,
        private zone:NgZone
    ) {

    }

    ngOnInit() {
        this._notificationSvc.messages.subscribe(notifications => {
            this.zone.run( () => this.notifications = notifications);
        });

        this._notificationSvc.notify("Welcome", "success");
    }

    clear() {
        this._notificationSvc.clear();
    }

}