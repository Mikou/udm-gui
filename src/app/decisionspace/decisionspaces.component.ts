import { Component, NgZone }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecisionspaceService }   from './decisionspace.service'
import { ConnectionService}       from '../socketFactory/connection.service';
import { SecurityService }        from '../security/security.service';
import { User }                   from '../security/user.model';
import { List }                   from 'immutable';

//@Guard('admin')
@Component({
    selector: 'udm-decisionspaces',
    styles: [`
        udm-decisionspace-preview {
            background-color:#fff;
            border:1px solid #ccc;
            display:block;
            margin:5px 0;
            padding:5px;
        }
    `],
    template: `
        <h2>List of all decision spaces</h2>
        <div>
            <div *ngIf="!decisionspaces">No decision space could be found</div>
            <udm-decisionspace-preview 
                class="decisionspace-thumb" 
                *ngFor='let dspace of decisionspaces' 
                [decisionspace]="dspace"
            ></udm-decisionspace-preview>
        </div>
        <div *ngIf="allowedCreateDecisionspace">
            <button (click)="newDecisionspace()">create a new decision space</button>
        </div>
    `
})
export class DecisionspacesComponent {

    decisionspaces:List<any>;
    allowedCreateDecisionspace:boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private decisionspaceService: DecisionspaceService,
        private securityService: SecurityService,
        private router: Router
    ) {}

    loadDecisionspace(loggedInUser:User) {
        this.decisionspaceService.getDecisionspaces(loggedInUser).subscribe(decisionspaces => {
            this.decisionspaces = decisionspaces;
        });
    }

    ngOnInit() {
        const loggedInUser:User = this.securityService.getCurrentUser();
        this.allowedCreateDecisionspace = this.securityService.hasRole('admin', 'domainexpert');

        this.activatedRoute.params.subscribe(p => {
            if (p["who"]) {
                /*this.decisionspaceService.fetchList(user, p["who"]).subscribe(decisionspaces => {
                    this.zone.run( () => this.decisionspaces = decisionspaces );
                });*/
            } else {
                this.loadDecisionspace(loggedInUser);
            }
        });

        // when logout action is triggered the decision spaces should be reloaded
        this.securityService.loggedInUser$.subscribe( () => {
            this.loadDecisionspace(this.securityService.getCurrentUser());
            this.allowedCreateDecisionspace = this.securityService.hasRole('admin', 'domainexpert');
        })
    }

    newDecisionspace() {
        let link = ['/create-decisionspace'];
        this.router.navigate(link);
    }
}