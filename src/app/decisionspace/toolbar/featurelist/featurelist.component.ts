import { Component } from '@angular/core';

@Component({
  selector: 'udm-featurelist',
  styles: [`
    udm-featurelistitem {
      padding: 2px;
      margin: 4px 0;
      background-color: #fff;
      border-left:2px solid #00f;
      display: block;
    }
  `],
  template: `
    <h3>{{title}}</h3>
    <udm-featurelistitem 
      *ngFor="let featureitem of featureitems" 
      [item]="featureitem"
    >
    </udm-featurelistitem>
  `
})

export class FeaturelistComponent {
  title = 'feature browser';

  featureitems = [
    {id:0, type:"featureItem", name:"comment", cptType:"comment",
      onDeploy: new Function(),
      config:{
        topicField: "WRITE A TOPIC",
      }},
    {id:1, type:"featureItem", name:"comments archive", cptType:"commentarchive", 
      onDeploy (target:any) {
        console.log("deployed", target);
      },
      config:{}, 
    },
  ];
}