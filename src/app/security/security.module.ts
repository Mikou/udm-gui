import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SecurityService } from './security.service';
import { securityRouting } from './security.routes';
import { LoginComponent } from './login.component';
import { SecurityNavComponent } from './securityNav.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //SocketFactoryModule,
    //NotificationModule,
    securityRouting
  ],  
  providers: [ SecurityService ],
  declarations: [ LoginComponent, SecurityNavComponent ],
  exports: [ SecurityNavComponent ]
})
export class SecurityModule {}