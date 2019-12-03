import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS, TreeComponent} from "angular-tree-component";
import {ACT_ITEMS, CONDITION_POSITION, UPDOWNKEYS} from "../ActItem.constant";
import {ITreeNode} from "angular-tree-component/dist/defs/api";
import {ActSelectionService} from "./act.selection.service";
import {ActScrollService} from "./act.scroll.service";
import {ActMappingService} from "./act.mapping.service";


@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActComponent implements OnInit, AfterViewInit {

  @ViewChild('tree', { static: false, read: TreeComponent }) tree: TreeComponent;
  @ViewChild('tree', { static: false, read: ElementRef }) treeEl: ElementRef;

  nodes = [
    {
      id: 1,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.START,
      name: [{pre:'IF', condition: 'If the user is located under the \'10k users (aurora.softerra.llc)\' container', post: 'THEN'}],
      children: [
        { id: 2, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
        { id: 3, name: 'Create the \'\\%username%\' home directory for the user and map it to \'Z:\' drive', type: ACT_ITEMS.ACTION }
      ]
    },
    {
      id: 4,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.END,
      name: [{pre:'ELSE IF', condition: 'the user is a member of the \'.TEST  group', post: 'AND'},
        {pre:'', condition: 'the user is a member of the \'.B  group', post: 'AND'},
        {pre:'', condition: 'the user is a member of the \'.C  group', post: 'THEN'}],
      children: [
        { id: 5, name: "'Activate an Office 365 account for the user: set Location to \'%c%\'", type: ACT_ITEMS.ACTION },
        { id: 51, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
        {
          id: 6,
          type: ACT_ITEMS.CONDITION,
          conditionPosition: CONDITION_POSITION.THEONE,
          name: [{pre:'IF', condition: 'inner condition l2', post: 'THEN'}],
          children: [
            { id: 61, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
            { id: 62, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
            { id: 63, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
            {
              id: 63995999,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.START,
              name: [{pre:'IF', condition: 'inner condition l3', post: 'THEN'}],
              children: [
                { id: 6731, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION },
                { id: 6732, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION },
                { id: 6733, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION }
              ]
            },
            {
              id: 6399992,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.MIDDLE,
              name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'THEN'}],
              children: [
                { id: 531, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                { id: 532, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  {
                    id: 76399992,
                    type: ACT_ITEMS.CONDITION,
                    conditionPosition: CONDITION_POSITION.START,
                    name: [{pre:'IF', condition: 'inner condition l4(1)', post: 'THEN'}],
                    children: [
                      { id: 7534, name: 'Activate an Office 365 account for the user A', type: ACT_ITEMS.ACTION },
                      { id: 7535, name: 'Activate an Office 365 account for the user B', type: ACT_ITEMS.ACTION },
                      { id: 7536, name: 'Activate an Office 365 account for the user C', type: ACT_ITEMS.ACTION },
                    ]
                  },
                  {
                    id: 7399992,
                    type: ACT_ITEMS.CONDITION,
                    conditionPosition: CONDITION_POSITION.END,
                    name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                    children: [
                      { id: 7537, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: 7538, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: 7539, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION }
                    ]
                  },
                { id: 533, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
              ]
            },
            {
              id: 6399993,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.MIDDLE,
              name: [{pre:'IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
              children: [
                { id: 534, name: 'Archive the home directory of the user A', type: ACT_ITEMS.ACTION },
                { id: 535, name: 'Archive the home directory of the user B', type: ACT_ITEMS.ACTION },
                { id: 536, name: 'Archive the home directory of the user C', type: ACT_ITEMS.ACTION },
              ]
            },
            {
              id: 6399995,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.END,
              name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'THEN'}],
              children: [
                { id: 537, name: 'Archive the home directory of the user D', type: ACT_ITEMS.ACTION },
                { id: 538, name: 'Archive the home directory of the user E', type: ACT_ITEMS.ACTION },
                { id: 539, name: 'Archive the home directory of the user F', type: ACT_ITEMS.ACTION },
                { id: 530, name: 'Archive the home directory of the user E', type: ACT_ITEMS.ACTION }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 67734,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.THEONE,
      name: [{pre:'IF', condition: 'super condition', post: 'THEN'}],
      children: [
        { id: 266625, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
        { id: 37364, name: 'action 2', type: ACT_ITEMS.ACTION }
      ]
    },
  ];


  readonly actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {this.mappingHelper.onClick(tree, node, $event); }
    },
    keys: {
      [KEYS.UP]: (tree, node, $event) => { this.mappingHelper.onKeysUp(tree, node, $event); },
      [KEYS.DOWN]: (tree, node, $event) => { this.mappingHelper.onKeysDown(tree, node, $event); }
    }
  }


  options: ITreeOptions = {
    actionMapping: this.actionMapping,
    levelPadding: 30,
    useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    scrollContainer: document.documentElement
  };

  nodeLevels: HTMLElement[] = [];
  nodeLevelsAllSiblings: HTMLElement[] = [];
  nodeLevelsGroupSiblings: HTMLElement[] = [];
  levelClassName: string;
  currentSelectedNode = null;
  focused = false;

  constructor(public renderer: Renderer2,
              public selectionHelper: ActSelectionService,
              public scrollHelper: ActScrollService,
              public mappingHelper: ActMappingService,
              public el: ElementRef,
              private cdr: ChangeDetectorRef,
              ) {
  }

  ngOnInit() {
    // for (let i = 0; i < 200; i++) {
    //   this.nodes.push({
    //     name: 'asdfasdf '
    //   });
    // }
  }

  ngAfterViewInit() {
    this.tree.treeModel.expandAll();
  }

  onCaptured(capturedIndex){
    this.mappingHelper.captured = true;
    this.mappingHelper.capturedIndex = +capturedIndex;
  }

  onEvent(event: any){
  }

  onActive(event: any){
  }

  onFocus(event: any){
    this.focused = true;
    const node = event.node;
    this.currentSelectedNode = event.node;
    // console.log('path '); console.log(node.path); console.log(node.getClass());

    this.selectionHelper.selectClean(this.renderer, this.nodeLevels);
    this.selectionHelper.cleanSiblingActiveGroup(this.renderer, this.nodeLevelsAllSiblings);
    this.nodeLevels = [];

    this.cdr.detectChanges();

    const nodeContentWrapperNodes = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll('.node-content-wrapper-focused',0));
    this.helpSelection(this.renderer, nodeContentWrapperNodes[0], this.el, this.nodeLevels);
    this.scrollHelper.moveScroll(this.mappingHelper.key, this.nodeLevels, this.treeEl);

  }

  onToggle(event: any){
    //this.tree.treeModel.expandAll();
  }

  onClick(event: any){
    if(this.focused){
      this.focused = false;
      return;
    }

    this.focused = false;
    this.selectionHelper.deactivateActiveNode(this.currentSelectedNode);
    this.selectionHelper.selectClean(this.renderer, this.nodeLevels);
    this.selectionHelper.cleanSiblingActiveGroup(this.renderer, this.nodeLevelsAllSiblings);
    this.nodeLevels = [];



    if(event.target.nodeName == "TREE-VIEWPORT"){
      return; // ignore, not inside tree
    }

    this.helpSelection(this.renderer, event.target, this.el, this.nodeLevels);
    this.scrollHelper.moveScroll(this.mappingHelper.key, this.nodeLevels, this.treeEl);
  }

  helpSelection(renderer, target, el, nodeLevels){

    if(!target){
      return;
    }

    console.log('TARGET');
    console.log(target);
    let parent = renderer.parentNode(target);


    while(parent.className != 'angular-tree-component'){
      // parent.nodeName
      if(parent.className.includes('tree-node') && !parent.className.includes('tree-node-leaf')){
        console.log('======= data');
        console.log(parent.getAttribute('data'));

        this.nodeLevels.push(parent);
      }

      parent = renderer.parentNode(parent);
    }

    this.selectionHelper.selectFirst(renderer, nodeLevels);
    this.selectionHelper.selectNavigation(renderer, el, nodeLevels);

    this.levelClassName = this.selectionHelper.selectGetLevelClassName(nodeLevels);
    this.nodeLevelsAllSiblings  = this.selectionHelper.selectGetAllSiblings(this.el, nodeLevels, this.levelClassName);
    this.nodeLevelsGroupSiblings = this.selectionHelper.selectGetGroupSiblings(renderer, this.nodeLevelsAllSiblings);
  }
}
