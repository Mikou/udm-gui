import { NgModule }      from '@angular/core';
import { DraggableModule } from '../shared/draggable/draggable.module';
import { WidgetModule } from './widget/widget.module';

import { CanvasComponent } from './canvas.component';

@NgModule({
  imports: [ DraggableModule, WidgetModule ],
  declarations: [ CanvasComponent ],
  exports: [CanvasComponent]
})
export class CanvasModule {}