import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressIndicatorComponent} from "../progress-indicator/progress-indicator.component";
import {AngularSplitModule} from "angular-split";
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  imports: [CommonModule, MatDialogModule, AngularSplitModule.forRoot()],
  declarations: [ProgressIndicatorComponent],
  exports: [ProgressIndicatorComponent],
  entryComponents: []
})
export class SharedModule {}
