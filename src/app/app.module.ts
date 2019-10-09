import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SharedModule} from "./shared/shared.module";
import {AngularSplitModule} from "angular-split";
import {ResizableComponent} from "./resizable/resizable.component";
import {AngularDraggableModule} from "angular2-draggable";
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { EditorContainerComponent } from './editor-container/editor-container/editor-container.component';
import { EditorContainer2Directive } from './editor-container2/editor-container2.directive';
import { UnderlinedInputComponent } from './underlined-input/underlined-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableComponent,
    MyCounterComponent,
    EditorContainerComponent,
    EditorContainer2Directive,
    UnderlinedInputComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
