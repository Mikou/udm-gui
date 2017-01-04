import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CanActivateRegistration } from './canActivate';
export const securityRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'register', component: RegisterComponent, canActivate:[CanActivateRegistration] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent }
]);