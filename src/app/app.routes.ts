import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';
import { DecisionspacesComponent } from './decisionspace/decisionspaces.component';
import { DecisionspaceComponent } from './decisionspace/decisionspace.component';
import { CreateDecisionspaceComponent } from './decisionspace/createdecisionspace.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
      .then((comp: any) => comp.default),
  },
  { path: 'decisionspaces',    component: DecisionspacesComponent },
  { path: 'decisionspaces/:id',    component: DecisionspaceComponent },
  { path: 'create-decisionspace',    component: CreateDecisionspaceComponent },
  { path: '**',    component: NoContentComponent },
];
