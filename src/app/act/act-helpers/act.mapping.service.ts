import { Injectable } from '@angular/core';

import { TREE_ACTIONS } from 'angular-tree-component';

import { upDownKeys } from './act.data.constant';

@Injectable()
export class ActMappingService
{
    key: number = upDownKeys.UP;

    capturedIndex: number;
    capturedNode;

    captured = false; // not used

    constructor() {}

    onClick(tree, node, $event)
    {
        if (this.capturedNode){
            this.capturedNode.data.selected = -1;
            this.captured = false;
        }

        if (!node.isLeaf && $event.target && $event.target.classList.contains('act-item-condition__content')){

            this.capturedNode = node;
            this.captured = true;
            node.data.selected = this.capturedIndex;
        }

        TREE_ACTIONS.ACTIVATE(tree, node, $event); // TOGGLE_ACTIVE_MULTI
    }

    onKeysUp(tree, node, $event, lastNode, mapToScrollCb)
    {
        if (!node || node && !node.isLeaf && !this.captured) // no node, or captured conditional set, start from last
        {
            tree.setActiveNode(lastNode);
            lastNode.setActiveAndVisible();
            return;
        }
        if (this.captured)
        {
            if (this.capturedIndex > 0)
            {

                this.capturedIndex = this.capturedIndex - 1;
                this.capturedNode.data.selected = this.capturedIndex;
                mapToScrollCb();
            }
            else // release
            {
                if (node && node.findPreviousNode(true)){ // check for first node
                    this.capturedNode.data.selected = -1;
                    this.captured = false;
                } else {
                    return; // first node
                }

            }
        }

        if (!this.captured && node)
        {
            this.capturedNode = node.findPreviousNode(true);

            if (this.isNodeConditinal())
            {
                this.captured = true;
                this.capturedIndex = this.capturedNode.data.name.length - 1;
                this.capturedNode.data.selected = this.capturedIndex;
            }

            this.key = upDownKeys.UP;
            TREE_ACTIONS.PREVIOUS_NODE(tree, node, $event);
        }
    }

    onKeysDown(tree, node, $event, firstNode, mapToScrollCb)
    {
        if (!node || node && !node.isLeaf && !this.captured) // start from first
        {
            tree.setActiveNode(firstNode);
            firstNode.setActiveAndVisible();
            this.captured = true;
            this.capturedNode = firstNode;
            this.capturedIndex = 0;
            this.capturedNode.data.selected = this.capturedIndex;
            return;
        }

        if (this.captured)
        {
            if (this.capturedIndex < this.capturedNode.data.name.length - 1)
            {
                this.capturedIndex = this.capturedIndex + 1;
                this.capturedNode.data.selected = this.capturedIndex;
                mapToScrollCb();
            }
            else // release
            {
                this.capturedNode.data.selected = -1;
                this.captured = false;
            }
        }

        if (!this.captured)
        {
            this.capturedNode = !!node
                ? node.findNextNode(true)
                : this.capturedNode.findNextNode(true);

            if (!this.capturedNode)
            {
                return; // last node
            }

            if (this.isNodeConditinal())
            {
                this.captured = true;
                this.capturedIndex = 0;
                this.capturedNode.data.selected = this.capturedIndex;
            }

            this.key = upDownKeys.DOWN;
            TREE_ACTIONS.NEXT_NODE(tree, node, $event);
        }
    }

    isNodeConditinal(){
        return this.capturedNode.data.name[0].pre;
    }

}
