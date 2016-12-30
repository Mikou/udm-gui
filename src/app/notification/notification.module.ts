import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  providers: [ NotificationService ],
  declarations: [ NotificationComponent ],
  exports: [ NotificationComponent ]
})
export class NotificationModule {}