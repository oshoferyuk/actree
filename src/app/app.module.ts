import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SharedModule} from "./shared/shared.module";

import {AngularDraggableModule} from "angular2-draggable";
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

import {ActSelectionService} from "./act/act.selection.service";
import {ActScrollService} from "./act/act.scroll.service";
import {ActMappingService} from "./act/act.mapping.service";
import {ActDataService} from "./act/act.data.service";
import {ActModule} from "./act/act.module";

@NgModule({
  declarations: [
    AppComponent,
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
    ActModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
