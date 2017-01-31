import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DraggableModule } from '../../shared/draggable/draggable.module';
import { FeatureCtrlService } from './featureCtrl.service';

/* APP root */
import { FeatureCtrlsComponent } from './featureCtrls.component';
import { FeatureCtrlComponent } from './featureCtrl.component';

/* Feature module */

@NgModule({
  imports: [ BrowserModule, DraggableModule ],
  declarations: [ FeatureCtrlsComponent, FeatureCtrlComponent ],
  exports: [FeatureCtrlsComponent],
  providers: [ FeatureCtrlService ]
})
export class FeatureCtrlModule {}