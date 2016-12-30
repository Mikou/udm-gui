import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { ConnectorService }  from './connector.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  providers: [ ConnectorService ],
  exports: [  ]
})
export class ConnectorModule {}