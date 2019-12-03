import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, Renderer2, ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {IActionMapping, ITreeOptions, KEYS, TREE_ACTIONS, TreeComponent} from "angular-tree-component";
import {ACT_ITEMS, CONDITION_POSITION, UPDOWNKEYS} from "../ActItem.constant";


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
  key: number = UPDOWNKEYS.UP;


  readonly actionMapping:IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        //this.deactivateActiveNode();
        if(this.captured){
          this.capturedNode = node;
          node.data.selected = this.capturedIndex;
          //TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event);
          TREE_ACTIONS.ACTIVATE(tree, node, $event);
        }

        if(!this.captured){
          TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event);
          //TREE_ACTIONS.ACTIVATE(tree, node, $event);
        }

      }
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => console.log(`This is ${node.data.name}`),
      [KEYS.UP]: (tree, node, $event) => {

    if(!node){
      node = this.capturedNode;
    }


        if(this.captured){
          if(this.capturedIndex > 0){
            this.capturedIndex = this.capturedIndex - 1;
            this.capturedNode.data.selected = this.capturedIndex;
          } else {
            //release
            this.capturedNode.data.selected = -1;
            this.captured = false;
          }
        }

    if(!this.captured){
        this.capturedNode = node.findPreviousNode(true);

        if(!this.capturedNode){
          return; //first node
        }

        if(this.capturedNode.data.name[0].pre){ //IF NODE IS CONDITIONAL!!!
          this.captured = true;
          this.capturedIndex = this.capturedNode.data.name.length - 1;
          this.capturedNode.data.selected = this.capturedIndex
        }


          this.key = UPDOWNKEYS.UP;
          TREE_ACTIONS.PREVIOUS_NODE(tree, node, $event);
        }

      },
      [KEYS.DOWN]: (tree, node, $event) => {

        if(!node){
          node = this.capturedNode;
        }

        if(this.captured){
          if(this.capturedIndex < this.capturedNode.data.name.length - 1){
            this.capturedIndex = this.capturedIndex + 1;
            this.capturedNode.data.selected = this.capturedIndex;
          } else {
            //release
            this.capturedNode.data.selected = -1;
            this.captured = false;
          }
        }

  if(!this.captured){


        this.capturedNode =  !!node ? node.findNextNode(true) : this.capturedNode.findNextNode(true);

        if(!this.capturedNode){
          return; //last node
        }

        if(this.capturedNode.data.name[0].pre){ //IF NODE IS CONDITIONAL!!!
          this.captured = true;
          this.capturedIndex = 0;
          this.capturedNode.data.selected = this.capturedIndex;
        }


          this.key = UPDOWNKEYS.DOWN;
          TREE_ACTIONS.NEXT_NODE(tree, node, $event);
        }

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

  nodeLevels: HTMLElement[] = []; //node elements
  nodeLevelsAllSiblings: any[] = []; //node elements
  nodeLevelsGroupSiblings: any[] = []; //node elements
  levelClassName: string;
  currentSelectedNode = null;
  focused = false;


  captured = false; // keyup or keydown could not be handled conditional component itself
  capturedIndex: number;
  capturedNode;

  constructor(public renderer: Renderer2,
              public el: ElementRef,
              private cdr: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
    this.captured = true;
    this.capturedIndex = +capturedIndex;
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

    this.selectClean();
    this._cleanSiblingActiveGroup();
    this.nodeLevels = [];

    this.cdr.detectChanges();

    const test = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll('.node-content-wrapper-focused',0));
    this.helpSelection(test[0]);
    this.addNavigation(test[0]);
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

// currentSelectedNode: HTMLElement
  deactivateActiveNode(){

    if(this.currentSelectedNode){
      this.currentSelectedNode.setIsActive(false);
      this.currentSelectedNode.blur();
    }



    //this.currentSelectedNode.toggleActivated();
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
        console.log('======= data');
        console.log(parent.getAttribute('data'));

        this.nodeLevels.push(parent);
      }

      parent = this.renderer.parentNode(parent);
    }

    this.selectFirst();
    this.selectNavigation();
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
  selectNavigation(){

    let selectedNavigationNodes = Array.prototype.slice.call(this.el.nativeElement.querySelectorAll('.' + 'act-item-condition__navigation'),0);
    selectedNavigationNodes.forEach(sNode => {
      this.renderer.removeClass(sNode, 'active');
    });
    selectedNavigationNodes = Array.prototype.slice.call(this.nodeLevels[0].querySelectorAll('.' + 'act-item-condition__navigation'),0);
    this.renderer.addClass(selectedNavigationNodes[0], 'active');
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


  addNavigation(target){

    //const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    //this.componentInstance = this.viewContainerRef.createComponent(componentFactory);


  }


  moveScroll(){

    const scrollNode = this.nodeLevels[0];
    const treeContainer = this.treeEl.nativeElement.querySelector('tree-viewport');

    if(this.isOutOfScrolledView(scrollNode, treeContainer)){

      if(this.key === UPDOWNKEYS.UP || scrollNode.clientHeight > window.innerHeight){
        scrollNode.scrollIntoView(true);
      } else {
        scrollNode.scrollIntoView(false);
      }
    }


  }


  isOutOfScrolledView(element, container) {


    console.log('////////////////////////000000000000----------------------->>')
    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    console.log('container top ' + cTop);
    console.log('container bottom ' + cBottom);

    const eTop = element.offsetTop;
    const eBottom = eTop + element.clientHeight;
console.log('element top ' + eTop);
console.log('element bottom ' + eBottom);
console.log('window ' +  window.innerHeight);







    // out
    return (eTop < cTop || eBottom > cBottom);

//    const elementRect = element.getBoundingClientRect();
//    const eTop = elementRect.top;
//    const eBottom = elementRect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    //return isVisible;
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
