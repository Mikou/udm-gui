import { Routes, RouterModule }    from '@angular/router';
import { HomeComponent }           from './home';
import { AboutComponent }          from './about';
import { NoContentComponent }      from './no-content';
import { DataResolver }            from './app.resolver';
import { DecisionspacesComponent } from './decisionspace/decisionspaces.component';
import { DecisionspaceComponent }  from './decisionspace/decisionspace.component';
import { ConnectionTestComponent } from './connectionTest.component';
import { CreateDecisionspaceComponent } from './decisionspace/createdecisionspace.component';
import { CanActivateDecisionspace } from './canActivateTeam';
import { CanActivateAdminTeam } from './canActivateTeam';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login',    loadChildren: './security/security.module'},
  { path: 'register',    loadChildren: './security/security.module'},
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: 'connectiontest',    component: ConnectionTestComponent },
  { path: 'decisionspaces',    component: DecisionspacesComponent },
  { path: 'decisionspaces/:who',    component: DecisionspacesComponent },
  { path: 'decisionspaces/detail/:id',    component: DecisionspaceComponent, canActivate:[CanActivateDecisionspace] },
  { path: 'create-decisionspace',    component: CreateDecisionspaceComponent },
  { path: '**',    component: NoContentComponent },
];
