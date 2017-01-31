import { Component, OnInit, NgZone } from '@angular/core';
import { FeatureCtrl }               from './featureCtrl.model';
import { FeatureCtrlService }        from './featureCtrl.service';
import { SecurityService }           from './../../../security/security.service';

@Component({
  selector: 'udm-featurectrls',
  styles: [`
    udm-featurectrl {
      padding: 2px;
      margin: 4px 0;
      background-color: #fff;
      border-left:2px solid #00f;
      display: block;
    }
  `],
  template: `
    <h3>{{title}}</h3>
    <udm-featurectrl 
      *ngFor="let featureCtrl of featureCtrls" 
      [featureCtrl]="featureCtrl"
    >
    </udm-featurectrl>
  `
})

export class FeatureCtrlsComponent implements OnInit {
  title = 'feature browser';
  featureCtrls:FeatureCtrl[] = [];

  constructor (
    private featureCtrlService: FeatureCtrlService,
    private securityService: SecurityService,
    private zone:NgZone
  ) {    
  }

  ngOnInit() {
    this.featureCtrlService.loadFeatureCtrls().subscribe( (featureCtrls) => {
      this.zone.run( () => this.featureCtrls = featureCtrls.toArray() );
    });
  }
}