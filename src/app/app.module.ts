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
import {ActModule} from "./act/act.module";
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import {ActSelectionService} from "./act/act-helpers/act.selection.service";
import {ActScrollService} from "./act/act-helpers/act.scroll.service";
import {ActMappingService} from "./act/act-helpers/act.mapping.service";
import {ActDataService} from "./act/act-helpers/act.data.service";
import {AppConfigService} from "../configuration.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,  ],
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
    ActModule,
    MatIconModule,
    HttpClientModule,
    IconSpriteModule
  ],
  providers: [AppConfigService, ActSelectionService, ActScrollService, ActMappingService, ActDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
