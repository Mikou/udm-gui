import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component'
import { Router } from '@angular/router';
//import { SecurityService } from '../security/security.service';
import { DecisionspaceService } from './decisionspace.service';
import { Observable } from 'rxjs/Observable';
import { UserinvitationComponent } from './userinvitation.component'

@Component({
  selector: 'udm-decisionspace',
  template: `
    <div class="intro">
      <h1>{{title}}</h1>
      <p>{{description}}</p>
      <udm-inviteuser></udm-inviteuser>
    </div>
    <ud2d-canvas [decisionspaceId]="'ds'" [ngClass]="role"></ud2d-canvas>
  `,
  styles: [`
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
  `]
})
export class DecisionspaceComponent {

  role:string
  decisionspaceId:string;
  title: string;
  description: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    //private securityService: SecurityService,
    private _dsService: DecisionspaceService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this._dsService.getDecisionSpaceInfo(p["id"]).then( (decisionspace:any) => {
        this.title = decisionspace.name;
        this.description = decisionspace.description;
      });
    });

    /*this.securityService.selectedUser$.subscribe(
      user => {
        if(user) {
          this.role = user.roles.toString();
        }
      }
    )*/
  }

  ngOnDestroy() {
    //this._dsService.disconnect();
  }
}