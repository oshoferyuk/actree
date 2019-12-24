// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration data constants.
// </summary>

import { IConditionPosition, INodeType } from './act.data.model';

export const nodeType: INodeType = {
    action: 0,
    condition: 1
};

export const conditionPosition: IConditionPosition = {
    one: 'one',
    start: 'start',
    middle: 'middle',
    end: 'end'
};

export const upDownKeys = {
    UP: 0,
    DOWN: 1
};
