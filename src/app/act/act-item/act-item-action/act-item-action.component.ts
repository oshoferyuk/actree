// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration tree item action component.
// </summary>

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'adm-act-item-action',
  templateUrl: './act-item-action.component.html',
  styleUrls: ['./act-item-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActItemActionComponent {

  @Input('name') name: string;
  constructor() { }

  activate(){}

}
