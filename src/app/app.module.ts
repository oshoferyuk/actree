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


import { TreeModule } from 'angular-tree-component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { ActItemActionComponent } from './tree-item/act-item-action/act-item-action.component';
import { ActItemConditionComponent } from './tree-item/act-item-condition/act-item-condition.component';
import { ActComponent } from './act/act.component';
import {ActSelectionDirective} from "./tree-item/act-selection.directive";
import {ActSelectionService} from "./act/act.selection.service";
import {ActScrollService} from "./act/act.scroll.service";
import {ActMappingService} from "./act/act.mapping.service";
import {ActDataService} from "./act/act.data.service";

@NgModule({
  declarations: [
    AppComponent,
    TreeItemComponent,
    ActItemActionComponent,
    ActItemConditionComponent,
    ActComponent,
    ActSelectionDirective
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
    TreeModule.forRoot()
  ],
  providers: [ActSelectionService, ActScrollService, ActMappingService, ActDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
