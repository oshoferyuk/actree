// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration data model.
// </summary>

export interface INodeType {
    action: number;
    condition: number;
}

export interface IConditionPosition {
    one: string;
    start: string;
    middle: string;
    end: string;
}

export interface IConditionName {
    pre: string;
    condition: string;
    post: string;
}

export interface IAction {
    id: number;
    name: string;
    type: INodeType;
}

export interface IActData {
    id: number;
    isExpanded: boolean;
    type: INodeType;
    conditionPosition: IConditionPosition;
    name: IConditionName[];
    children: IAction[];
}
