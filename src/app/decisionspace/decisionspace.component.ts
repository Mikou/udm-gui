import { Component }               from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import { ToolbarComponent }        from './toolbar/toolbar.component';
import { DecisionspaceService }    from './decisionspace.service';
import { Observable }              from 'rxjs/Observable';
import { UserinvitationComponent } from './userinvitation.component';

@Component({
  selector: 'udm-decisionspace',
  template: `
    <div class="intro">
      <span><strong>{{title}}</strong> | {{description}}</span>
    </div>
    <udm-inviteuser [decisionspaceId]="decisionspaceId"></udm-inviteuser>
    <udm-canvas [decisionspaceId]="'ds'" [ngClass]="role"></udm-canvas>
  `,
  styles: [`
    .intro {
      color:#fff;
      padding:1px 5px;
      background-color:lightslategray;
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
  `]
})
export class DecisionspaceComponent {

  role:string
  decisionspaceId:string;
  title: string;
  description: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _dsService: DecisionspaceService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      this.decisionspaceId = p["id"];
      this._dsService.getDecisionSpaceInfo(p["id"]).then( (decisionspace:any) => {
        this.title = decisionspace.name;
        this.description = decisionspace.description;
      });
    });
  }

  ngOnDestroy() {
    //this._dsService.disconnect();
  }
}