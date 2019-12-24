import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeModule } from 'angular-tree-component';
import { MatIconModule } from '@angular/material';

import { ActComponent } from './act.component';
import { ActItemComponent } from './act-item/act-item.component';
import { ActItemActionComponent } from './act-item/act-item-action/act-item-action.component';
import { ActItemConditionComponent } from './act-item/act-item-condition/act-item-condition.component';
import { ActDataService } from './act-helpers/act.data.service';
import { ActSelectionService } from './act-helpers/act.selection.service';
import { ActScrollService } from './act-helpers/act.scroll.service';
import { ActMappingService } from './act-helpers/act.mapping.service';
import { ActNavComponent } from './act-item/act-nav/act-nav.component';


@NgModule({
    imports: [CommonModule, TreeModule.forRoot(), MatIconModule],
    exports: [ActComponent],
    declarations: [
        ActComponent,
        ActItemComponent,
        ActItemActionComponent,
        ActItemConditionComponent,
        ActNavComponent
    ],
    providers: [ActDataService, ActSelectionService, ActScrollService, ActMappingService]
})
export class ActModule {}
