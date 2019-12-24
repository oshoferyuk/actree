// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration tree component.
// </summary>

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    IActionMapping,
    ITreeOptions,
    KEYS,
    TreeComponent,
    TreeNode
} from 'angular-tree-component';
import { ActDataService } from '@admc-common/shared/act/act-helpers/act.data.service';
import { ActSelectionService } from './act-helpers/act.selection.service';
import { ActScrollService } from './act-helpers/act.scroll.service';
import { ActMappingService } from './act-helpers/act.mapping.service';

@Component({
    selector: 'adm-act',
    templateUrl: './act.component.html',
    styleUrls: ['./act.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActComponent implements OnInit, AfterViewInit
{
    @ViewChild('tree', { static: false, read: TreeComponent }) tree: TreeComponent;
    @ViewChild('tree', { static: false, read: ElementRef }) treeEl: ElementRef;

    treeData = [];

    readonly actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node, $event) =>
            {
                this.mappingHelper.onClick(tree, node, $event);
            }
        },
        keys: {
            67: (tree, node, $event) =>
            {
                alert('save');
            },
            86: (tree, node, $event) =>
            {
                alert('paste');
            },
            [KEYS.UP]: (tree, node, $event) =>
            {
                this.mappingHelper.onKeysUp(
                    tree,
                    node,
                    $event,
                    this.getLastSelectedTreeNode(),
                    this.mapToScrollCb.bind(this)
                );
            },
            [KEYS.DOWN]: (tree, node, $event) =>
            {
                this.mappingHelper.onKeysDown(
                    tree,
                    node,
                    $event,
                    this.getFirstSelectedTreeNode(),
                    this.mapToScrollCb.bind(this)
                );
            }
        }
    };

    options: ITreeOptions = {
        useVirtualScroll: true,
        levelPadding: 30,
        actionMapping: this.actionMapping,
        // allowDrag: (node) => node.isLeaf,
        // allowDrop: (node) => node.isLeaf,
        scrollOnActivate: false,
        scrollContainer: document.body.parentElement as HTMLElement
    };

    nodeLevels: HTMLElement[] = []; // all nodes up from selected, up to active node level 1
    nodeLevelsAllSiblings: HTMLElement[] = []; // all siblings to current active node
    nodeLevelsGroupSiblings: HTMLElement[] = []; // all group siblings
    levelClassName: string;
    currentSelectedNode = null;
    focused = false;

    // todo change to private
    constructor(
        public renderer: Renderer2,
        public el: ElementRef,
        public dataHelper: ActDataService,
        public selectionHelper: ActSelectionService,
        public scrollHelper: ActScrollService,
        public mappingHelper: ActMappingService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit()
    {
        this.dataHelper.select().subscribe(data =>
        {
            this.treeData = data;
        });
    }

    ngAfterViewInit()
    {
        this.tree.treeModel.expandAll();

        this.options.useVirtualScroll = false;
        this.cdr.detectChanges();
    }

    onFocus(event: any)
    {
        if (this.currentSelectedNode === event.node){
            return;
        }

        this.focused = true;
        this.currentSelectedNode = event.node;

        this.cleanSelection();
        this.cdr.detectChanges(); // click node on the selection

        const nodeContentWrapperNodes = Array.prototype.slice.call(
            this.el.nativeElement.querySelectorAll('.node-content-wrapper-focused', 0)
        );
        this.helpSelection(this.renderer, nodeContentWrapperNodes[0], this.el, this.nodeLevels);
        this.scrollHelper.moveScroll(this.mappingHelper.key, this.nodeLevels, this.treeEl);
        // this.tree.treeModel.virtualScroll.scrollIntoView(node, true); // for virtual scroll
    }

    mapToScrollCb()
    {
        this.cdr.detectChanges();
        this.scrollHelper.moveScroll(this.mappingHelper.key, this.nodeLevels, this.treeEl);
    }

    onClick(event: any)
    {
        // TODO: ashof works ok, but sometimes with redundant invocation
        if (event.target.nodeName === 'TREE-VIEWPORT')
        {
            return; // ignore, not inside tree
        }

        if (this.focused && event.target.className !== 'node-wrapper')
        {
            return; // ignore, pass to onFocus
        }

        this.focused = false;
        this.currentSelectedNode = event.node;

        this.selectionHelper.deactivateActiveNode(this.currentSelectedNode);
        this.cleanSelection();
        this.helpSelection(this.renderer, event.target, this.el, this.nodeLevels);

        this.scrollHelper.moveScroll(this.mappingHelper.key, this.nodeLevels, this.treeEl);
        this.mappingHelper.captured = false;

        // TODO: needed only for first time
        const node = this.getFirstSelectedTreeNode();
        node.mouseAction('click', {});
    }

    cleanSelection()
    {
        this.selectionHelper.selectClean(this.renderer, this.nodeLevels, this.el);
        this.selectionHelper.cleanSiblingActiveGroup(this.renderer, this.nodeLevelsAllSiblings);
        this.nodeLevels = [];
    }

    helpSelection(renderer, target, el, nodeLevels)
    {
        if (!target)
        {
            return;
        }

        this.selectionHelper.selectGetNodeLevels(renderer, target, this.nodeLevels);
        this.selectionHelper.selectActive(renderer, nodeLevels, this.el);
        this.selectionHelper.selectNavigation(renderer, el, nodeLevels);

        this.levelClassName = this.selectionHelper.selectGetLevelClassName(nodeLevels);
        this.nodeLevelsAllSiblings = this.selectionHelper.selectGetAllSiblings(
            this.el,
            nodeLevels,
            this.levelClassName
        );
        this.nodeLevelsGroupSiblings = this.selectionHelper.selectGetGroupSiblings(
            renderer,
            this.nodeLevelsAllSiblings
        );

        this.selectionHelper.selectPostActive(el, this.nodeLevelsGroupSiblings, renderer);
    }

    onCaptured(capturedIndex)
    {
        this.mappingHelper.captured = true;
        this.mappingHelper.capturedIndex = +capturedIndex;
    }

    getFirstLastSelectedTreeNode(): [TreeNode, TreeNode]
    {
        let first: TreeNode;
        let last: TreeNode;

        const id = this.nodeLevels[0].getAttribute('data');

        if (id)
        {
            first = this.tree.treeModel.getNodeById(+id);
            last = first.getLastChild();
            while (last.hasChildren)
            {
                last = last.getLastChild();
            }
        }
        return [last, first];
    }

    getLastSelectedTreeNode(): TreeNode
    {
        return this.getFirstLastSelectedTreeNode()[0];
    }

    getFirstSelectedTreeNode(): TreeNode
    {
        return this.getFirstLastSelectedTreeNode()[1];
    }
}
