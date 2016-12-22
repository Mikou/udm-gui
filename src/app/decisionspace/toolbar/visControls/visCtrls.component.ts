import { Component, OnInit, NgZone } from '@angular/core';
//import { ConnectionService} from '../../../socketFactory/connection.service';

import { VisCtrlComponent} from './visCtrl.component';
import { VisCtrlService } from './visCtrl.service';
import { CreateVisCtrlComponent} from './createVisCtrl.component';

@Component({
  selector: 'ud2d-visctrls',
  styles: [
    `
      udm-visctrl {
        list-style: none;
      }

      udm-createVisCtrl {
        border:1px solid #ccc;
        opacity:0.5;
        float:left;
        padding:5px;
        font-size:.75em;
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
  visCtrls:any = [];

  constructor (
    //private connectionService: ConnectionService,
    private visCtrlService: VisCtrlService,
    private zone:NgZone
  ) {
    
  }

  ngOnInit() {
    //this.getVisCtrls();
    this.visCtrlService.visCtrls.subscribe( (visCtrls) => {
        this.zone.run( () => this.visCtrls = visCtrls );
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