import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SecurityService } from './security.service';
import { securityRouting } from './security.routes';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SecurityNavComponent } from './securityNav.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CanActivateRegistration } from './canActivate';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
          prefix: 'udm',
          storageType: 'localStorage'
    }),
    //SocketFactoryModule,
    //NotificationModule,
    securityRouting
  ],  
  providers: [ SecurityService, CanActivateRegistration ],
  declarations: [ LoginComponent, RegisterComponent, SecurityNavComponent ],
  exports: [ SecurityNavComponent ]
})
export class SecurityModule {}