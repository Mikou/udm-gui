import { Component, NgZone, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'udm-decisionspace-preview',
    styles: [`
            button: {
                float:right;
            }
            .publicationstate {
                float:right;
            }
    `],
    template: `
        <i *ngIf="!decisionspace.published" class="publicationstate fa fa-lock"></i>
        <h3>{{decisionspace.name}}</h3>
        <p>{{decisionspace.description}}</p>
        <button (click)="onClick(decisionspace)">join</button>
        `
})
export class DecisionspacePreviewComponent {
    constructor(
        private router: Router
    ) {
        
    }
    @Input() decisionspace:any;

    onClick(dspace:any) {
        let link = ['/decisionspaces/detail', this.decisionspace.id];
        this.router.navigate(link);
    }
}