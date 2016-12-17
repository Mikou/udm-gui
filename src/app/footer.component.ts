import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector:'udm-footer',
    template:'<div>{{text}}</div>'
})
export class FooterComponent {
    text:string = 'Urban Decision Maker';
}