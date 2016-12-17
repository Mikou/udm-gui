import { Component } from '@angular/core';
import { FooterComponent } from './footer.component';

import {
  inject,
  TestBed
} from '@angular/core/testing';

describe('FooterComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FooterComponent
    ]}))

    it('should have a text', inject([FooterComponent], (footer: FooterComponent) => {
        expect(footer.text).toEqual('Urban Decision Maker');
    }));
});