import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ud2d-visualization',
    styles: [`
        iframe: {
            position:absolute;top:0;left:0;width:100%; height:100%;
            border:1px solid #666;
        }
        
    `],
    template: `
        <div *ngIf="errorMessage">
            <div class="message">{{errorMessage}}</div>
        </div>
        <div *ngIf="!errorMessage">
            <iframe class="iframe" frameborder="0" width="100%" 
            style="border: 1px solid #333; width: 100%; height: 300px;"
            [src]="visUrl"></iframe>
        </div>
    `
})
export class VisualizationComponent {
    @Input() visualization: any;

    visUrl:any;
    errorMessage:string;
    
    constructor(private domSanitizer:DomSanitizer) {}

    ngOnInit() {
        if(this.visualization) {
            this.visUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.visualization.url);
        } else {
            this.errorMessage = "Could not load the visualization";
        }
    }
}