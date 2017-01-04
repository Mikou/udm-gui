import { Component, OnInit, NgZone } from '@angular/core';
//import { ConnectionService} from '../../../socketFactory/connection.service';

import { VisCtrlComponent} from './visCtrl.component';
import { VisCtrlService } from './visCtrl.service';
import { CreateVisCtrlComponent} from './createVisCtrl.component';
import { VisCtrl } from './../../toolbar/visControls/visCtrl.model';
import { SecurityService } from './../../../security/security.service';

@Component({
  selector: 'udm-visctrls',
  styles: [
    `
      udm-visctrl {
        padding: 2px;
        margin: 4px 0;
        background-color: #fff;
        border-left:2px solid #f00;
        display: block;
      }
      udm-createVisCtrl {
        background-color:#fff;
        float:left;
        opacity:0.75;
        padding:5px;
        font-size:.75em;
        width:180px;
      }
    `
  ],
  template: `
    <h3>{{title}}</h3>
    <udm-visctrl 
      *ngFor="let visCtrl of visCtrls" 
      [item]="visCtrl"
    >
    </udm-visctrl>
    <div *ngIf="showCreateForm">
      <udm-createVisCtrl></udm-createVisCtrl>
    </div>
  `
})

export class VisCtrlsComponent {
  title = 'visualization browser';
  showCreateForm:boolean = false;
  visCtrls:VisCtrl[] = [];

  constructor (
    private visCtrlService: VisCtrlService,
    private securityService: SecurityService,
    private zone:NgZone
  ) {    
  }

  ngOnInit() {
    this.securityService.loggedInUser$.subscribe( user => this.showCreateForm = this.securityService.hasRole('admin', 'domainexpert') );
    this.visCtrlService.visCtrls.subscribe( (visCtrls) => {
      this.zone.run( () => this.visCtrls = visCtrls.toArray() );
    });
  }
}