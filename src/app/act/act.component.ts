import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS} from "angular-tree-component";
import {ACT_ITEMS, CONDITION_POSITION, UPDOWNKEYS} from "../ActItem.constant";
import {ITreeNode} from "angular-tree-component/dist/defs/api";

@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent implements OnInit, AfterViewInit {

  @ViewChild('tree', { static: false }) tree;
  @ViewChild('treeEl', { static: false }) treeEl: ElementRef;

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
              id: 63995999,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.START,
              name: [{pre:'IF', condition: 'inner condition l3', post: ''}],
              children: [
                { id: 6731, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 6732, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 6733, name: 'action', type: ACT_ITEMS.ACTION }
              ]
            },
            {
              id: 6399992,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.MIDDLE,
              name: [{pre:'IF', condition: 'inner condition l3(2)', post: ''}],
              children: [
                { id: 531, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 532, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 533, name: 'action', type: ACT_ITEMS.ACTION }
              ]
            },
            {
              id: 6399993,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.MIDDLE,
              name: [{pre:'IF', condition: 'inner condition l3(2)', post: ''}],
              children: [
                { id: 534, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 535, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 536, name: 'action', type: ACT_ITEMS.ACTION }
              ]
            },
            {
              id: 6399995,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.END,
              name: [{pre:'IF', condition: 'inner condition l3(2)', post: ''}],
              children: [
                { id: 537, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 538, name: 'action', type: ACT_ITEMS.ACTION },
                { id: 539, name: 'action', type: ACT_ITEMS.ACTION }
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
  key: number = UPDOWNKEYS.UP;


  readonly actionMapping:IActionMapping = {
    mouse: {},
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => console.log(`This is ${node.data.name}`),
      [KEYS.UP]: (tree, node, $event) => {
        this.key = UPDOWNKEYS.UP;
        TREE_ACTIONS.PREVIOUS_NODE(tree, node, $event);
      },
      [KEYS.DOWN]: (tree, node, $event) => {
        //console.log($event.target);
        this.key = UPDOWNKEYS.DOWN;
         TREE_ACTIONS.NEXT_NODE(tree, node, $event);
        //node.mouseAction('click', event);

      }
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

  nodeLevels: any[] = []; //node elements
  nodeLevelsAllSiblings: any[] = []; //node elements
  nodeLevelsGroupSiblings: any[] = []; //node elements
  levelClassName: string;
  currentSelectedNode = null;
  focused = false;

  constructor(public renderer: Renderer2, public el: ElementRef, private cdr: ChangeDetectorRef) {
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
  }

  onActive(event: any){
  }

  onFocus(event: any){
console.log("FOCUS")
    this.focused = true;
    const node = event.node;
    this.currentSelectedNode = event.node;
    // console.log('path '); console.log(node.path); console.log(node.getClass());

    this.selectClean();
    this._cleanSiblingActiveGroup();
    this.nodeLevels = [];

    this.cdr.detectChanges();

    const test = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll('.node-content-wrapper-focused',0));
    this.helpSelection(test[0]);
  }

  onToggle(event: any){
    this.tree.treeModel.expandAll();
  }

  onClick(event: any){
    console.log('CLICK')
    if(this.focused){
      this.focused = false;
      return;
    }

    this.focused = false;
    this.deactivateActiveNode();
    this.selectClean();
    this._cleanSiblingActiveGroup();
    this.nodeLevels = [];



    if(event.target.nodeName == "TREE-VIEWPORT"){
      // ignore, not inside tree
      return;
    }

    this.helpSelection(event.target);
  }


  deactivateActiveNode(){

    if(this.currentSelectedNode){
      this.currentSelectedNode.setIsActive(false);
      this.currentSelectedNode.blur();
    }



    //console.log('88888888888888888888888888887777777777777777777');
    //this.currentSelectedNode.toggleActivated();
    //console.log(this.tree.treeModel.getFocusedNode());
    //this.tree.treeModel.getFocusedNode().toggleActivated()
    //this.tree.treeModel.setSelectedNode(this.currentSelectedNode)
    //TREE_ACTIONS.DESELECT(this.tree, this.currentSelectedNode, event);

    //this.currentSelectedNode.setIsSelected(false);
    //this.cdr.detectChanges();
    //this.tree.treeModel.setSelectedNode(this.currentSelectedNode)
    //TREE_ACTIONS.DESELECT(this.tree, this.currentSelectedNode, event);
  }

  helpSelection(target){

    if(!target){
      return;
    }

    console.log('TARGET');
    console.log(target);
    let parent = this.renderer.parentNode(target);


    while(parent.className != 'angular-tree-component'){
      // parent.nodeName
      if(parent.className.includes('tree-node') && !parent.className.includes('tree-node-leaf')){
        console.log('88888888888888833333333333333333333333333333333 data');
        console.log(parent.getAttribute('data'));

        this.nodeLevels.push(parent);
      }

      parent = this.renderer.parentNode(parent);
    }

    this.selectFirst();
    this.selectActiveGroup();
    this.moveScroll();
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

  selectGetLevelClassName(){
    if(this.nodeLevels.length < 1){
      console.log('warning [act] invoke selectActiveGroup for empty set');
      return;
    }

    const selectedNode = this.nodeLevels[0];
    const selectedNodeClassNames = selectedNode.className.split(' ');
    return selectedNodeClassNames[0];
  }

  selectGetAllSiblings(){
    this.levelClassName = this.selectGetLevelClassName();
    this.nodeLevelsAllSiblings = [];
    if(this.nodeLevels.length > 1){
      const parentLevel = this.nodeLevels[1];

      this.nodeLevelsAllSiblings = Array.prototype.slice.call(parentLevel.querySelectorAll('.' + this.levelClassName + ':not(.tree-node-leaf)'),0);
    }else {
      this.nodeLevelsAllSiblings = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll('.' + this.levelClassName),0);
    }
    console.log(this.nodeLevelsAllSiblings);
  }

  selectGetGroupSiblings(){

    this._cleanSiblingActiveGroup();
    const activatedSiblingsPosition = this._getActiveGroupBoundaries();
    if(activatedSiblingsPosition.end === -1 || activatedSiblingsPosition.start === -1){
      console.log('warning [act] sibling positions are not found');
    }
    console.log('all siblings');
    console.log(this.nodeLevelsAllSiblings);

    this._cleanSiblingActiveGroup();
    this.nodeLevelsGroupSiblings = [];
    this.nodeLevelsAllSiblings.forEach((el,i) => {
      if(activatedSiblingsPosition.start <= i && i <= activatedSiblingsPosition.end){
        this.nodeLevelsGroupSiblings.push(el);
        this.renderer.addClass(el, 'active-group');
      }
    });
    console.log('group siblings');
    console.log(this.nodeLevelsGroupSiblings);
  }

  selectActiveGroup(){

    this.selectGetAllSiblings();
    this.selectGetGroupSiblings();
}

  moveScroll(){
    console.log('height****');
    console.log('offset height ' + <HTMLElement>this.nodeLevels[0].offsetHeight);
    console.log('offset top ' + <HTMLElement>this.nodeLevels[0].offsetTop);

    // offsetHeight: 864
    // offsetTop: 118


    if(!this.isScrolledIntoView(this.nodeLevels[0])){
      const scrollNode = this.nodeLevels[0];

      //console.log('scrolling node ---------------');
      //console.log('node top ' + scrollNode.top);

      if(this.key === UPDOWNKEYS.UP){
        scrollNode.scrollIntoView({block: "start", behavior: "smooth"});
      } else {
        scrollNode.scrollIntoView({block: "end", behavior: "smooth"});
      }
    }


  }


  isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }


private _cleanSiblingActiveGroup(){
  this.nodeLevelsAllSiblings.forEach(el => {
    this.renderer.removeClass(el, 'active-group');
  });
}

private _getActiveGroupBoundaries(){
  let start = -1;
  let end = -1;
  let found = false;
  this.nodeLevelsAllSiblings.forEach((el, i) => {
      if(el.className.includes('theone') && el.className.includes('active') ){
        start = i;
        end = i;
        return;
      }

    if(el.className.includes('start')){
      start = i;
    }

    if(el.className.includes('active')){
      found = true;
    }

    if(el.className.includes('end')){
      if(found){
        end = i;
        return;
      }
    }
  });
  return {start, end};
}



scroll(){
  let el = document.getElementById('test333');
  el.scrollIntoView();
}

}
