import { Component, Input, OnChanges, NgZone } from '@angular/core';
import { Feature }                from './feature.interface';
import { List }                   from 'immutable';
import { Observable }             from 'rxjs/Observable';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';
import { ConnectorService }       from '../../../../connector/connector.service';

@Component({
    selector: 'ud2d-comment-archive',
    template: `
      <h3>Comments archive</h3>
      
      <div *ngIf="!comments">No comments found.</div>
      <ul *ngIf="comments">
        <li *ngFor="let comment of comments"><strong>{{comment.topic}}</strong>, {{comment.message}}</li>
      </ul>
    `
})
export class CommentArchiveComponent implements Feature {
    //private _subscriptionMessage: BehaviorSubject<List<SubscriptionMessage>> = new BehaviorSubject(List([]));
    //public subscriptionMessage: Observable<List<SubscriptionMessage>> = this._subscriptionMessage.asObservable();

    @Input() decisionspaceId:number;
    @Input() bundleId:number;
    @Input() payload:Array<any>;

    //comments:List<Comment>;
    comments:Array<Comment>;

    constructor(
        private connectorService: ConnectorService,
        private zone:NgZone,
    ) {}

    onDeploy () {
        let _comments = this.comments
        this.connectorService.call('backend.feature.retrievecontent', [this.decisionspaceId, this.bundleId, 'COMMENT'])
        .then( res => {
            const comments = res.map( featureContent => featureContent.data );
            this.zone.run( () => this.comments = comments );
        })
        .catch(err => {
            console.log(err);
        })
    }

    ngOnInit() {
        const _comments = this.comments;
        const _bundleId = this.bundleId;
        
        if(this.payload) {
            this.comments = this.payload.map( entry => {
                return entry["data"];
            });
        }

        this.connectorService.subscribe('newcomment', this, (scope, decisionspaceId, bundleId, comment) => {
            if(scope.bundleId == bundleId) {
                this.comments.push(comment);
            }
        });
    }
}