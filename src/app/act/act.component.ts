import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {IActionMapping, ITreeOptions, KEYS, TreeComponent} from "angular-tree-component";
import {ActSelectionService} from "./act.selection.service";
import {ActScrollService} from "./act.scroll.service";
import {ActMappingService} from "./act.mapping.service";
import {ActDataService} from "./act.data.service";
import {ACT_ITEMS, CONDITION_POSITION} from "../ActItem.constant";


@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActComponent implements OnInit, AfterViewInit {

  @ViewChild('tree', { static: false, read: TreeComponent }) tree: TreeComponent;
  @ViewChild('tree', { static: false, read: ElementRef }) treeEl: ElementRef;

  nodes = [];

  readonly actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {this.mappingHelper.onClick(tree, node, $event); }
    },
    keys: {
      67: (tree, node, $event) => { alert('save') },
      86: (tree, node, $event) => { alert('paste') },
      [KEYS.UP]: (tree, node, $event) => { this.mappingHelper.onKeysUp(tree, node, $event); },
      [KEYS.DOWN]: (tree, node, $event) => { this.mappingHelper.onKeysDown(tree, node, $event); }
    }
  }


  options: ITreeOptions = {
    actionMapping: this.actionMapping,
    levelPadding: 30,
    useVirtualScroll: true,
    //animateExpand: true,
    //scrollOnActivate: true,
    //animateSpeed: 500,
    //animateAcceleration: 1.2,
    //scrollContainer: document.documentElement
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
              public dataHelper: ActDataService,
              public el: ElementRef,
              private cdr: ChangeDetectorRef,
              ) {
  }

  random(){
    return Math.floor((Math.random() * 100000) + 1);
  }

  ngOnInit() {

    this.dataHelper.select().subscribe((data)=>{
      //this.nodes = data;


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      for (let i = 1; i < 10; i++) {
        this.nodes.push({
            id: this.random(),
            type: ACT_ITEMS.CONDITION,
            conditionPosition: CONDITION_POSITION.THEONE,
            name: [{pre:'IF' + i, condition: 'If the user is located under the \'10k users (aurora.softerra.llc)\' container', post: 'THEN'}],
            children: [
              { id: this.random(), name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
              { id: this.random(), name: 'Create the \'\\%username%\' home directory for the user and map it to \'Z:\' drive', type: ACT_ITEMS.ACTION },
              {
                id: this.random(),
                type: ACT_ITEMS.CONDITION,
                conditionPosition: CONDITION_POSITION.THEONE,
                name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                children: [
                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  {
                    id: this.random(),
                    type: ACT_ITEMS.CONDITION,
                    conditionPosition: CONDITION_POSITION.THEONE,
                    name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                    children: [
                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      {
                        id: this.random(),
                        type: ACT_ITEMS.CONDITION,
                        conditionPosition: CONDITION_POSITION.THEONE,
                        name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                        children: [
                          { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                          { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                          { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                          {
                            id: this.random(),
                            type: ACT_ITEMS.CONDITION,
                            conditionPosition: CONDITION_POSITION.THEONE,
                            name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                            children: [
                              { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                              { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                              { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                              {
                                id: this.random(),
                                type: ACT_ITEMS.CONDITION,
                                conditionPosition: CONDITION_POSITION.THEONE,
                                name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                                children: [
                                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                                  { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                                  {
                                    id: this.random(),
                                    type: ACT_ITEMS.CONDITION,
                                    conditionPosition: CONDITION_POSITION.THEONE,
                                    name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                                    children: [
                                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                                      { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
            ]
          },
        );
      }
    });
  }

  ngAfterViewInit() {
    this.tree.treeModel.expandAll();
  }

  onCaptured(capturedIndex){
    this.mappingHelper.captured = true;
    this.mappingHelper.capturedIndex = +capturedIndex;
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
     //this.cdr.markForCheck();

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

    let parent = renderer.parentNode(target);


    while(parent.className != 'angular-tree-component'){
      // parent.nodeName
      if(parent.className.includes('tree-node') && !parent.className.includes('tree-node-leaf')){

        //console.log(parent.getAttribute('data'));

        this.nodeLevels.push(parent);
      }

      parent = renderer.parentNode(parent);
    }

    this.selectionHelper.selectActive(renderer, nodeLevels);
    this.selectionHelper.selectNavigation(renderer, el, nodeLevels);

    this.levelClassName = this.selectionHelper.selectGetLevelClassName(nodeLevels);
    this.nodeLevelsAllSiblings  = this.selectionHelper.selectGetAllSiblings(this.el, nodeLevels, this.levelClassName);
    this.nodeLevelsGroupSiblings = this.selectionHelper.selectGetGroupSiblings(renderer, this.nodeLevelsAllSiblings);
  }
}
