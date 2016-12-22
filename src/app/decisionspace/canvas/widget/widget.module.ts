import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DraggableModule } from '../../shared/draggable/draggable.module';
import { WidgetlistComponent } from './widgetlist.component';
import { WidgetComponent } from './widget.component';
import { CommentFeatureComponent } from './featureComponents/comment.component';
import { VisualizationComponent } from './visualization.component';
import { CommentarchiveComponent } from './featureComponents/commentarchive.component';


import { WidgetService } from './widget.service';

/* Feature module */

@NgModule({
  imports: [ BrowserModule, DraggableModule ],
  declarations: [ 
    CommentFeatureComponent, 
    WidgetlistComponent, 
    WidgetComponent, 
    VisualizationComponent,
    CommentarchiveComponent
  ],
  entryComponents: [ 
    CommentFeatureComponent, 
    CommentarchiveComponent,
    VisualizationComponent 
  ],
  providers: [
    WidgetService
  ],
  exports: [ WidgetlistComponent ]
})
export class WidgetModule {}