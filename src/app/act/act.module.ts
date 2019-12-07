import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeItemComponent} from "../tree-item/tree-item.component";
import {ActItemActionComponent} from "../tree-item/act-item-action/act-item-action.component";
import {ActItemConditionComponent} from "../tree-item/act-item-condition/act-item-condition.component";
import {ActComponent} from "./act.component";
import {ActSelectionDirective} from "../tree-item/act-selection.directive";
import {TreeModule} from "angular-tree-component";
import {ActSelectionService} from "./act.selection.service";
import {ActScrollService} from "./act.scroll.service";
import {ActMappingService} from "./act.mapping.service";
import {ActDataService} from "./act.data.service";

@NgModule({
  imports: [
    CommonModule,
    TreeModule.forRoot()
  ],
  exports: [ActComponent],
  declarations: [
    ActComponent,
    TreeItemComponent,
    ActItemActionComponent,
    ActItemConditionComponent,
    ActComponent,
    ActSelectionDirective
  ],
  providers: [ActSelectionService, ActScrollService, ActMappingService, ActDataService],
})
export class ActModule { }
