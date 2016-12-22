// Module structure example: http://plnkr.co/edit/?p=preview
// https://angular.io/docs/ts/latest/guide/ngmodule.html

import { NgModule }      from '@angular/core';

/* APP root */
import { ToolbarComponent } from './toolbar.component';

import { VisCtrlModule } from './visControls/visCtrl.module';
import { FeaturelistModule } from './featurelist/featurelist.module';

/* Feature module */

@NgModule({
  imports: [ VisCtrlModule, FeaturelistModule ],
  declarations: [ ToolbarComponent ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}