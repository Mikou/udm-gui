import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DecisionspaceComponent } from './decisionspace.component';
import { DecisionspacePreviewComponent } from './decisionspace-prev.component';
import { CreateDecisionspaceComponent } from './createdecisionspace.component';
import { DecisionspacesComponent } from './decisionspaces.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { CanvasModule } from './canvas/canvas.module';
import { DecisionspaceService } from './decisionspace.service';
import { UserinvitationComponent } from './userinvitation.component';
import { UserinvitationService } from './userinvitation.service';
import { SecurityModule } from '../security/security.module';
import { ConnectorModule } from '../connector/connector.module';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    CanvasModule,
    SecurityModule,
    ConnectorModule
  ],
  providers: [ DecisionspaceService, UserinvitationService ],
  declarations: [ 
    DecisionspacePreviewComponent, 
    DecisionspaceComponent, 
    DecisionspacesComponent,
    CreateDecisionspaceComponent, 
    UserinvitationComponent,
  ],
  exports: [ DecisionspacesComponent ]
})
export class DecisionspaceModule {}