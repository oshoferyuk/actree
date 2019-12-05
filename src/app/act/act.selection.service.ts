import { Injectable } from "@angular/core";
import {ITreeNode} from "angular-tree-component/dist/defs/api";


@Injectable()
export class ActSelectionService {


  constructor() {

  }


  selectActive(renderer, nodeLevels: any){
    this.selectClean(renderer, nodeLevels);

    if(nodeLevels[0]){
      renderer.addClass(nodeLevels[0], 'active'); // current active
    }

    if(nodeLevels[nodeLevels.length - 1]){
      renderer.addClass(nodeLevels[nodeLevels.length - 1], 'active-first'); //active first means that we somewhere inside of this level 1
    }
  }

  selectClean(renderer, nodeLevels: HTMLElement[]){
    nodeLevels.forEach(node => {
      renderer.removeClass(node, 'active');
      renderer.removeClass(node, 'active-first');
    });
  }


  selectGetLevelClassName(nodeLevels){
    if(nodeLevels.length < 1){
      console.log('warning [act] invoke selectActiveGroup for empty set');
      return;
    }

    const selectedNode = nodeLevels[0];
    const selectedNodeClassNames = selectedNode.className.split(' ');
    return selectedNodeClassNames[0];
  }


  selectGetAllSiblings(el, nodeLevels, levelClassName){

    let nodeLevelsAllSiblings;
    if(nodeLevels.length > 1){
      const parentLevel = nodeLevels[1];

      nodeLevelsAllSiblings = Array.prototype.slice.call(parentLevel.querySelectorAll('.' + levelClassName + ':not(.tree-node-leaf)'),0);
    }else {
      nodeLevelsAllSiblings = Array.prototype.slice.call(el.nativeElement.querySelectorAll('.' + levelClassName),0);
    }
    return nodeLevelsAllSiblings;
  }


  selectNavigation(renderer, el, nodeLevels){

    let selectedNavigationNodes = Array.prototype.slice.call(el.nativeElement.querySelectorAll('.' + 'act-item-condition__navigation'),0);
    selectedNavigationNodes.forEach(sNode => {
      renderer.removeClass(sNode, 'active');
    });
    selectedNavigationNodes = Array.prototype.slice.call(nodeLevels[0].querySelectorAll('.' + 'act-item-condition__navigation'),0);
    renderer.addClass(selectedNavigationNodes[0], 'active');
  }



  selectGetGroupSiblings(renderer, nodeLevelsAllSiblings){

    this.cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings);
    const activatedSiblingsPosition = this._getActiveGroupBoundaries(nodeLevelsAllSiblings);
    if(activatedSiblingsPosition.end === -1 || activatedSiblingsPosition.start === -1){
      console.log('warning [act] sibling positions are not found');
    }

    this.cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings);
    const nodeLevelsGroupSiblings = [];
    nodeLevelsAllSiblings.forEach((el,i) => {
      if(activatedSiblingsPosition.start <= i && i <= activatedSiblingsPosition.end){
        nodeLevelsGroupSiblings.push(el);
        renderer.addClass(el, 'active-group');
      }
    });
    return nodeLevelsGroupSiblings;
  }


  cleanSiblingActiveGroup(renderer, nodeLevelsAllSiblings: HTMLElement[]){
    nodeLevelsAllSiblings.forEach(el => {
      renderer.removeClass(el, 'active-group');
    });
  }


  private _getActiveGroupBoundaries(nodeLevelsAllSiblings){
    let start = -1;
    let end = -1;
    let found = false;
    nodeLevelsAllSiblings.forEach((el, i) => {
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



  deactivateActiveNode(currentSelectedNode: ITreeNode){

    if(currentSelectedNode){
      currentSelectedNode.setIsActive(false);
      currentSelectedNode.blur();
    }
  }

}



// selectNext(){
//   const activeIndex = this.selectFindActive(this.nodeLevels);
//   this.unSelectByNumber(activeIndex);
//   this.selectByNumber(activeIndex + 1);
// }
//
// selectPrev(){
//   const activeIndex = this.selectFindActive(this.nodeLevels);
//   this.unSelectByNumber(activeIndex);
//   this.selectByNumber(activeIndex - 1);
// }
// selectLast(){
//   this.selectClean(this.nodeLevels);
//   const length = this.nodeLevels.length;
//   if(length > 0){
//     this.renderer.addClass(this.nodeLevels[length - 1], 'active');
//   }
// }


// selectByNumber(order: number){
//   if(order >= this.nodeLevels.length || order < 0)
//     return;
//       this.renderer.addClass(this.nodeLevels[order], 'active');
// }
//
// unSelectByNumber(order: number){
//   if(order >= this.nodeLevels.length || order < 0)
//     return;
//   this.renderer.removeClass(this.nodeLevels[order], 'active');
// }
//
// selectFindActive(nodeLevels){
//   let found = -1;
//   nodeLevels.forEach((node,i) => {
//     console.log(` search ${node.className}`);
//     if(node.className.includes('active')){
//       found = i;
//     }
//   });
//   return found;
// }
