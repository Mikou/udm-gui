import { Component }               from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { ToolbarComponent }        from './toolbar/toolbar.component';
import { DecisionspaceService }    from './decisionspace.service';
import { Observable }              from 'rxjs/Observable';
import { UsermanagerComponent }    from './usermanager.component';
import { SecurityService }         from '../security/security.service';
import { NotificationService }     from '../notification/notification.service';
import { DecisionSpace }           from './models/decisionspace.model';
import { Bundle }                  from './models/bundle.model';
import { List }                    from 'immutable';

@Component({
  selector: 'udm-decisionspace',
  template: `
    <div class="intro">
      <span><strong>{{title}}</strong> | {{description}}</span>
    </div>
    <div>
      <p class="note">!!! Note: The drag-and-drop support and interaction with the elements in the decisionspace are still very buggy !!!</p>
    <div>

    <udm-infomanager></udm-infomanager>

    <div *ngIf="displayUserManager">
      <udm-usermanager [decisionspaceId]="decisionspaceId"></udm-usermanager>
    </div>

    <udm-canvas [decisionspaceId]="decisionspaceId" [bundles]="bundles" [ngClass]="role"></udm-canvas>
  `,
  styles: [`
    .intro {
      color:#fff;
      padding:1px 5px;
      background-color:lightslategray;
    }
    .note {
      padding:5px;
      color:#fff;
      background-color:#800;
    }
    udm-inviteuser {
      float:right;
    }
    #content {
      background-color:#eee;
      padding:10px;
    }
    ud2d-toolbar {
      padding:0 10px;
      width: 200px; float: left; height: 200px;
      height:100%;
      background-color:#fff;
    }
    ud2d-canvas {
      width: 500px;
      margin: 0 auto;
      height:100%;
      background-color:#fff;
    }
    ud2d-canvas.admin {
      padding:0 10px;
      margin: 0 -250px 0 auto;
    }
    udm-infomanager {
      display:block;
      border:1px solid lightslategray;
      background-color:#e3e7ea;
      padding:10px;
      margin:5px;
    }
    udm-usermanager {
      display:block;
      border:1px solid lightslategray;
      background-color:#e3e7ea;
      padding:10px;
      margin:5px;
    }
  `]
})
export class DecisionspaceComponent {
  role:string
  decisionspaceId:number;
  title: string;
  description: string;
  displayUserManager:boolean;
  bundles: List<Bundle>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _dsService: DecisionspaceService,
    private securityService: SecurityService,
    private notificationService: NotificationService

  ) {}

  ngOnInit() {
    this.bundles = List([]);
    this.securityService.loggedInUser$.subscribe( () => {
      this.displayUserManager = this.securityService.hasRole('admin', 'domainexpert');
    });

    this.activatedRoute.params.subscribe(p => {
      
      this._dsService.joinDecisionspace(this.securityService.getCurrentUser(), p["id"])
        .then( (decisionspace:DecisionSpace) => {
          this.decisionspaceId = decisionspace.id;
          this._dsService.setDecisionspaceId(this.decisionspaceId);
          this.title           = decisionspace.title;
          this.description     = decisionspace.description;
          this.bundles         = List(decisionspace.bundles);
        })
        .catch( err => this.notificationService.notify(err, 'error'))
    });
  }

  ngOnDestroy() {
    //this._dsService.disconnect();
  }
}