import {Component, Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ud2d-visualization',
    styles: [`
        .iframe: {
            position:absolute;top:0;left:0;width:100%; height:100%;
        }
    `],
    template: `
        <div *ngIf="errorMessage">
            <div class="message">{{errorMessage}}</div>
        </div>
        <div *ngIf="!errorMessage">
            <iframe class="iframe" frameborder="0" [src]="visUrl"></iframe>
        </div>
    `
})
export class VisualizationComponent {
    @Input() config: any;

    visUrl:any;
    errorMessage:string;
    
    constructor(private domSanitizer:DomSanitizer) {}

    ngOnInit() {
        if(this.config) {
            this.visUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.config.url);
        } else {
            console.log("error:", this.config);
            this.errorMessage = "A problem occured. This visualization cannot be shown";
        }
    }
}