import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DraggableModule }         from '../../shared/draggable/draggable.module';
import { BundlesComponent }        from './bundles.component';
import { BundleComponent }         from './bundle.component';
import { CommentArchiveComponent } from './featureComponents/commentArchive.component';
import { CommentFormComponent }    from './featureComponents/commentForm.component';
import { VisualizationComponent }  from './visualization.component';
import { FeatureComponent }        from './featureComponents/feature.component';
import { BundleService }           from './bundle.service';

/* Feature module */

@NgModule({
  imports: [ 
    BrowserModule, 
    DraggableModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [ 
    FeatureComponent,
    CommentArchiveComponent,
    CommentFormComponent, 
    BundlesComponent, 
    BundleComponent, 
    VisualizationComponent,
  ],
  entryComponents: [ 
    CommentFormComponent, 
    CommentArchiveComponent,
    VisualizationComponent,
    FeatureComponent
  ],
  providers: [
    BundleService
  ],
  exports: [ BundlesComponent ]
})
export class bundleModule {}