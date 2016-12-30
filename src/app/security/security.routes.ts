import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LoginComponent } from './login.component';

export const securityRouting: ModuleWithProviders = RouterModule.forChild([
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent }
]);