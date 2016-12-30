import { Component, OnInit, NgZone } from '@angular/core';
//import { ConnectionService} from '../../../socketFactory/connection.service';

import { VisCtrlComponent} from './visCtrl.component';
import { VisCtrlService } from './visCtrl.service';
import { CreateVisCtrlComponent} from './createVisCtrl.component';
import { VisCtrl } from './../../toolbar/visControls/visCtrl.model';

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
    <udm-createVisCtrl></udm-createVisCtrl>
  `
})

export class VisCtrlsComponent {
  title = 'visualization browser';
  visCtrls:VisCtrl[] = [];

  constructor (
    //private connectionService: ConnectionService,
    private visCtrlService: VisCtrlService,
    private zone:NgZone
  ) {    
  }

  ngOnInit() {
    //this.getVisCtrls();
    this.visCtrlService.visCtrls.subscribe( (visCtrls) => {
      this.zone.run( () => this.visCtrls = visCtrls.toArray() );
    });
  }

  /*getVisCtrls() {
    this.visCtrlService.getControls().then( (visCtrls:any) => {
        this.visCtrls = visCtrls;
    });
    this.connectionService.call('udm.backend.visCtrls', []).then( (visCtrls:any) => {
        this.visCtrls = visCtrls;
    });
  };*/

}