import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

//import { LoginComponent } from './login.component';
//import { RegisterComponent } from './register.component';
//import { NotificationModule } from '../notification/notification.module';
//import { SecurityComponent } from './security.component';
import { SecurityService } from './security.service';
//import { SocketFactoryModule } from '../socketFactory/socketFactory.module'
//import { securityRouting } from './security.routes';


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    //SocketFactoryModule,
    //NotificationModule,
    //securityRouting
  ],
  providers: [ SecurityService ],
  declarations: [ ],
  exports: [ ]
})
export class SecurityModule {}