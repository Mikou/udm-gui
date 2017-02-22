import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DraggableModule } from '../../shared/draggable/draggable.module';
import { BundlesComponent } from './bundles.component';
import { BundleComponent } from './bundle.component';
import { CommentarchiveComponent } from './featureComponents/commentarchive.component';
import { CommentFeatureComponent } from './featureComponents/comment.component';
import { VisualizationComponent } from './visualization.component';


import { BundleService } from './bundle.service';

/* Feature module */

@NgModule({
  imports: [ 
    BrowserModule, 
    DraggableModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [ 
    CommentFeatureComponent, 
    BundlesComponent, 
    BundleComponent, 
    VisualizationComponent,
    CommentarchiveComponent
  ],
  entryComponents: [ 
    CommentFeatureComponent, 
    CommentarchiveComponent,
    VisualizationComponent
  ],
  providers: [
    BundleService
  ],
  exports: [ BundlesComponent ]
})
export class bundleModule {}