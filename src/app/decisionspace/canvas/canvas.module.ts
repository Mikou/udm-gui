import { NgModule }      from '@angular/core';
import { DraggableModule } from '../shared/draggable/draggable.module';
import { bundleModule } from './bundle/bundle.module';

import { CanvasComponent } from './canvas.component';

@NgModule({
  imports: [ DraggableModule, bundleModule ],
  declarations: [ CanvasComponent ],
  exports: [CanvasComponent]
})
export class CanvasModule {}