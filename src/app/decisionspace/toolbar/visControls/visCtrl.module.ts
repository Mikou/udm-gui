import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DraggableModule } from '../../shared/draggable/draggable.module';
import { VisCtrlsComponent } from './visCtrls.component';
import { VisCtrlComponent } from './visCtrl.component';
import { VisCtrlService } from './visCtrl.service';
import { CreateVisCtrlComponent} from './createVisCtrl.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  imports: [ BrowserModule, DraggableModule, FormsModule, ReactiveFormsModule],
  declarations: [ VisCtrlsComponent, VisCtrlComponent, CreateVisCtrlComponent ],
  providers: [ VisCtrlService ],
  exports: [VisCtrlsComponent]
})
export class VisCtrlModule {}