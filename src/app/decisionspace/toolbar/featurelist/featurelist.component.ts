import { Component } from '@angular/core';

@Component({
  selector: 'udm-featurelist',
  template: `
    <h3>{{title}}</h3>
    <ud2d-featurelistitem 
      *ngFor="let featureitem of featureitems" 
      [item]="featureitem"
    >
    </ud2d-featurelistitem>
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