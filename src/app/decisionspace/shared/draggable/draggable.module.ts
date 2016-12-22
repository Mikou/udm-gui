import { NgModule }      from '@angular/core';

import {MakeDraggable} from './make-draggable.directive';
import {MakeDroppable} from './make-droppable.directive';

@NgModule({
  declarations: [ MakeDraggable, MakeDroppable ],
  exports: [ MakeDraggable, MakeDroppable ]
})
export class DraggableModule {}