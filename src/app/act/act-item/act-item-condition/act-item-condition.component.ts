// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration tree item condition component.
// </summary>

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IConditionName } from '../../act-helpers/act.data.model';

@Component({
    selector: 'adm-act-item-condition',
    templateUrl: './act-item-condition.component.html',
    styleUrls: ['./act-item-condition.component.scss']
})
export class ActItemConditionComponent {
    @Input('name') name: IConditionName[];
    @Input('selected') selected?: number;
    @Output() captured = new EventEmitter<number>();

    constructor() {}


    onClick({ target }) {
        if (target.className.includes('act-item-condition__content')) {
            const index = target.getAttribute('data-condition-index');
            this.captured.emit(index);
        }
    }
}
