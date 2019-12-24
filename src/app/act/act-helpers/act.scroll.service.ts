import { Injectable } from '@angular/core';

import { upDownKeys } from './act.data.constant';

import { Logger } from '@admc-common/core';
const log = new Logger('ActScrollService');

@Injectable()
export class ActScrollService
{
    constructor() {}

    moveScroll(key, nodeLevels, treeEl)
    {
        const firstNode = nodeLevels[0];
        const level1Node = nodeLevels[nodeLevels.length - 1];

        if (!firstNode)
        {
            log.warn('[moveScroll] invoked with not existing nodes');
        }

        const treeContainer = treeEl.nativeElement.querySelector('tree-viewport');

        if (this.isOutOfScrolledView(treeContainer, firstNode, level1Node))
        {
            if (key === upDownKeys.UP)
            {
                // the client more then container
                if (firstNode.clientHeight > treeContainer.clientHeight)
                {
                    const currectSelected = this.getSelectedItem(treeEl);
                    if (
                        currectSelected &&
                        this.isOutOfScrolledActive(
                            treeContainer,
                            firstNode,
                            level1Node,
                            currectSelected
                        )
                    )
                    {
                        currectSelected.scrollIntoView(true);
                    }
                }
                else
                {
                    firstNode.scrollIntoView(true);
                }
            } // down
            else
            {
                // the client more then container
                if (firstNode.clientHeight > treeContainer.clientHeight)
                {
                    // sometimes it is not enough to move scroll to the start, if we key don on the bottom
                    const currectSelected = this.getSelectedItem(treeEl);
                    if (
                        currectSelected &&
                        this.isOutOfScrolledActive(
                            treeContainer,
                            firstNode,
                            level1Node,
                            currectSelected
                        )
                    )
                    {
                        currectSelected.scrollIntoView(false);
                    }
                }
                else
                {
                    firstNode.scrollIntoView(false);
                }
            }
        }
    }

    isOutOfScrolledView(container, first, level1Node)
    {
        const cTop = container.scrollTop;
        const cBottom = cTop + container.clientHeight;

        let fTop;
        let fBottom;

        if (first === level1Node)
        {
            fTop = first.offsetTop;
            fBottom = fTop + first.clientHeight;
        }
        else
        {
            // !all offset calculated based on level1 cause it is relational
            fTop = first.offsetTop + level1Node.offsetTop;
            fBottom = fTop + first.clientHeight;
        }

        return fTop < cTop || fBottom > cBottom; // out
    }

    // TODO : refactor
    isOutOfScrolledActive(container, first, level1Node, active)
    {
        const cTop = container.scrollTop;
        const cBottom = cTop + container.clientHeight;
        let fTop;
        let fBottom;

        if (first === level1Node)
        {
            fTop = active.offsetTop + level1Node.offsetTop;
            fBottom = fTop + active.clientHeight;
        }
        else
        {
            fTop = active.offsetTop + level1Node.offsetTop;
            fBottom = fTop + active.clientHeight;
        }
        return fTop < cTop || fBottom > cBottom; // out
    }

    getSelectedItem(treeEl): HTMLElement | null
    {
        // conditional comes first
        const conditionSelected = treeEl.nativeElement.querySelector(
            '.node-content-condition--active'
        );
        if (conditionSelected)
        {
            return conditionSelected;
        }

        // action
        const actionSelected = treeEl.nativeElement.querySelector('.node-content-wrapper-focused');
        if (actionSelected)
        {
            return actionSelected;
        }
        return null;
    }
}
