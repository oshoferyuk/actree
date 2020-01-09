import { Injectable } from '@angular/core';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';

@Injectable()
export class ActSelectionService
{
    constructor() {}

    /**
     * Mark current selected node as active and the above first level as active-first
     */
    selectActive(renderer, nodeLevels: any, el)
    {
        this.selectClean(renderer, nodeLevels, el);

        const firstBottomNode = nodeLevels[0];
        const lastTopNode = nodeLevels[nodeLevels.length - 1];

        if (firstBottomNode)
        {
            renderer.addClass(firstBottomNode, 'active'); // current active
        }

        if (lastTopNode)
        {
            renderer.addClass(lastTopNode, 'active-first');
        }
    }

    /**
     * Mark next level 1 after the current
     */
    selectPostActive(el, lastSiblings, renderer)
    {
        const lastSibling = lastSiblings[lastSiblings.length - 1];
        const level1s = Array.prototype.slice.call(
            el.nativeElement.querySelectorAll('.tree-node-level-1', 0)
        );

        level1s.forEach((l1, i) =>
        {
            if (l1 === lastSibling) {

                if (level1s[i + 1])
                {
                    renderer.addClass(level1s[i + 1], 'post-after-active');
                }
                return;
            }
        });
    }

    /**
     * Remove active, active-first, post-after-active marks
     */
    selectClean(renderer, nodeLevels: HTMLElement[], el)
    {
        nodeLevels.forEach(node =>
        {
            renderer.removeClass(node, 'active');
            renderer.removeClass(node, 'active-first');
        });

        const level1s = Array.prototype.slice.call(
            el.nativeElement.querySelectorAll('.tree-node-level-1', 0)
        );
        level1s.forEach(l =>
        {
            renderer.removeClass(l, 'post-after-active');
        });
    }

    /**
     * Get level class name
     */
    selectGetLevelClassName(nodeLevels)
    {
        if (nodeLevels.length < 1)
        {
            console.warn('[selectGetLevelClassName] invoke selectActiveGroup for empty set');
            return;
        }

        const selectedNode = nodeLevels[0];
        const selectedNodeClassNames = selectedNode.className.split(' ');
        return selectedNodeClassNames[0];
    }

    /**
     * Get all active siblings
     */
    selectGetAllSiblings(el, nodeLevels, levelClassName)
    {
        let nodeLevelsAllSiblings;
        if (nodeLevels.length > 1)
        {
            const parentLevel = nodeLevels[1];

            nodeLevelsAllSiblings = Array.prototype.slice.call(
                parentLevel.querySelectorAll('.' + levelClassName + ':not(.tree-node-leaf)'),
                0
            );
        }
        else
        {
            nodeLevelsAllSiblings = Array.prototype.slice.call(
                el.nativeElement.querySelectorAll('.' + levelClassName),
                0
            );
        }
        return nodeLevelsAllSiblings;
    }

    /**
     * Get group siblings
     */
    selectGetGroupSiblings(renderer, nodeLevelsAllSiblings)
    {

        this.cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings);
        const nodeLevelsGroupSiblings = [];

        const activatedSiblingsPosition = this._getActiveGroupBoundaries(nodeLevelsAllSiblings);
        if (activatedSiblingsPosition.end === -1 || activatedSiblingsPosition.start === -1)
        {
            console.warn('[selectGetGroupSiblings] sibling positions are not found');
        }

        // this.cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings);
        // const nodeLevelsGroupSiblings = [];

        nodeLevelsAllSiblings.forEach((el, i) =>
        {
            if (activatedSiblingsPosition.start <= i && i <= activatedSiblingsPosition.end)
            {
                nodeLevelsGroupSiblings.push(el);
                renderer.addClass(el, 'active-group');
            }
        });
        return nodeLevelsGroupSiblings;
    }


    selectGetNodeLevels(renderer, target, nodeLevels){
        let parent = renderer.parentNode(target);

        while (parent.className !== 'angular-tree-component')
        {
            if (parent.className === 'tree-wrap')
            {
                return; // click on the padding of the tree
            }

            if (parent.className.includes('tree-node') && !parent.className.includes('tree-node-leaf'))
            {
                nodeLevels.push(parent);
            }

            parent = renderer.parentNode(parent);
        }
    }


    /**
     * Mark navigation for conditional node
     */
    selectNavigation(renderer, el, nodeLevels)
    {
        if (nodeLevels.length < 1){
            return; // not inside tree
        }

        let selectedNavigationNodes = Array.prototype.slice.call(
            el.nativeElement.querySelectorAll('.' + 'act-item-condition__navigation'),
            0
        );

        selectedNavigationNodes.forEach(sNode =>
        {
            renderer.removeClass(sNode, 'active');
        });

        selectedNavigationNodes = Array.prototype.slice.call(
            nodeLevels[0].querySelectorAll('.' + 'act-item-condition__navigation'),
            0
        );
        renderer.addClass(selectedNavigationNodes[0], 'active');
    }


    /**
     * Clean active siblings
     */
    cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings: HTMLElement[])
    {
        nodeLevelsAllSiblings.forEach(el =>
        {
            renderer.removeClass(el, 'active-group');
        });
    }

    deactivateActiveNode(currentSelectedNode: ITreeNode)
    {
        if (currentSelectedNode)
        {
            currentSelectedNode.setIsActive(false);
            currentSelectedNode.data.selected = -1;
            currentSelectedNode.blur();
        }
    }

    private _getActiveGroupBoundaries(nodeLevelsAllSiblings)
    {
        let start = -1;
        let end = -1;
        let found = false;
        nodeLevelsAllSiblings.forEach((el, i) =>
        {
            if (el.className.includes('one') && el.className.includes('active'))
            {
                start = i;
                end = i;
                return;
            }

            if (el.className.includes('start'))
            {
                start = i;
            }

            if (el.className.includes('active'))
            {
                found = true;
            }

            if (el.className.includes('end'))
            {
                if (found)
                {
                    end = i;
                    return;
                }
            }
        });
        return { start, end };
    }
}
