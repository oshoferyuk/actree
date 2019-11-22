import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS} from "angular-tree-component";
import {ACT_ITEMS, CONDITION_POSITION} from "../ActItem.constant";

@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent implements OnInit, AfterViewInit {

  @ViewChild('tree', { static: false }) tree;

  nodes = [
    {
      id: 1,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.START,
      name: [{pre:'IFs', condition: 'super condition', post: 'THEN'}],
      children: [
        { id: 2, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
        { id: 3, name: 'action 2', type: ACT_ITEMS.ACTION }
      ]
    },
    {
      id: 4,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.END,
      name: [{pre:'ELSE IF', condition: 'super condition', post: 'AND'},
        {pre:'', condition: 'another super condition', post: 'AND'},
        {pre:'', condition: 'cond 3', post: 'THEN'}],
      children: [
        { id: 5, name: 'action 5', type: ACT_ITEMS.ACTION },
        { id: 51, name: 'action 51', type: ACT_ITEMS.ACTION },
        {
          id: 6,
          type: ACT_ITEMS.CONDITION,
          conditionPosition: CONDITION_POSITION.THEONE,
          name: [{pre:'IF', condition: 'inner condition l2', post: ''}],
          children: [
            { id: 61, name: 'action', type: ACT_ITEMS.ACTION },
            { id: 62, name: 'action', type: ACT_ITEMS.ACTION },
            { id: 63, name: 'action', type: ACT_ITEMS.ACTION },
            {
              id: 6399999,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.THEONE,
              name: [{pre:'IF', condition: 'inner condition l3', post: ''}],
              children: [
                { id: 631, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 632, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 633, name: 'action', type: ACT_ITEMS.ACTION }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 67,
      type: ACT_ITEMS.CONDITION,
      conditionPosition: CONDITION_POSITION.THEONE,
      name: [{pre:'IF', condition: 'super condition', post: 'THEN'}],
      children: [
        { id: 265, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
        { id: 374, name: 'action 2', type: ACT_ITEMS.ACTION }
      ]
    },
  ];



  readonly actionMapping:IActionMapping = {
    mouse: {
      click: TREE_ACTIONS.NEXT_NODE
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  }


  options: ITreeOptions = {
    scrollContainer: <HTMLElement>document.body.parentElement,
    actionMapping: this.actionMapping
  };


  nodeLevels: any[] = []; //node elements

  constructor(public renderer: Renderer2, public el: ElementRef) {

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

  onEvent(event: any){
    console.log(event);
  }

  onToggle(event: any){
    this.tree.treeModel.expandAll();
  }

  onClick(event: any){
    this.selectClean();
    this.nodeLevels = [];

    if(event.target.nodeName == "TREE-VIEWPORT"){
      // ignore, not inside tree
      return;
    }

    let parent = this.renderer.parentNode(event.target);


    while(parent.className != 'angular-tree-component'){
      // parent.nodeName
      if(parent.className.includes('tree-node') && !parent.className.includes('tree-node-leaf')){
       // console.log(parent.className);
        this.nodeLevels.push(parent);
      }

      parent = this.renderer.parentNode(parent);
    }
    this.selectFirst();
  }


  testSelection(event){
      console.log(this.nodeLevels);
    ///this.renderer.addClass(this.nodeLevels[0], 'active');

  }


  selectClean(){
    this.nodeLevels.forEach(node => {
      this.renderer.removeClass(node, 'active');
    });
  }

  selectByNumber(order: number){
    if(order >= this.nodeLevels.length || order < 0)
      return;
        this.renderer.addClass(this.nodeLevels[order], 'active');
  }

  unSelectByNumber(order: number){
    if(order >= this.nodeLevels.length || order < 0)
      return;
    this.renderer.removeClass(this.nodeLevels[order], 'active');
  }

  selectFindActive(){
    let found = -1;
    this.nodeLevels.forEach((node,i) => {
      console.log(` search ${node.className}`);
      if(node.className.includes('active')){
        found = i;
      }
    });
    return found;
  }

  selectNext(){
    const activeIndex = this.selectFindActive();
    this.unSelectByNumber(activeIndex);
    this.selectByNumber(activeIndex + 1);
  }

  selectPrev(){
    const activeIndex = this.selectFindActive();
    this.unSelectByNumber(activeIndex);
    this.selectByNumber(activeIndex - 1);
  }

  selectFirst(){
    this.selectClean();
    if(this.nodeLevels[0]){
      this.renderer.addClass(this.nodeLevels[0], 'active');
    }
  }

  selectLast(){
    this.selectClean();
    const length = this.nodeLevels.length;
    if(length > 0){
      this.renderer.addClass(this.nodeLevels[length - 1], 'active');
    }
  }


}






















//const levelNodes = this.el.nativeElement.querySelector('[class^="tree-node-level"]');
//console.log(this.el);
// const levelNodes = this.el.nativeElement.querySelectorAll('tree-node'); // TODO ashof improve, not all, but levels if needed
//console.log('------------ levels');
//levelNodes.forEach((levelNode) => {
//console.log(levelNode);
// this.renderer.removeClass(levelNode, 'active');
//})
