import { Injectable } from "@angular/core";
import {ITreeNode} from "angular-tree-component/dist/defs/api";
import {UPDOWNKEYS} from "../ActItem.constant";


@Injectable()
export class ActScrollService {


  constructor() {

  }


  moveScroll(key,nodeLevels, treeEl )
  {

    const scrollNode = nodeLevels[0];
    const treeContainer = treeEl.nativeElement.querySelector('tree-viewport');

    if (this.isOutOfScrolledView(scrollNode, treeContainer)) {

      if (key === UPDOWNKEYS.UP || scrollNode.clientHeight > window.innerHeight) {
        scrollNode.scrollIntoView(true);
      } else {
        scrollNode.scrollIntoView(false);
      }
    }

  }



  isOutOfScrolledView(element, container) {

    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    //console.log('container top ' + cTop);
    //console.log('container bottom ' + cBottom);

    const eTop = element.offsetTop;
    const eBottom = eTop + element.clientHeight;
    //console.log('element top ' + eTop);
    //console.log('element bottom ' + eBottom);
    //console.log('window ' +  window.innerHeight);

    // out
    return (eTop < cTop || eBottom > cBottom);

  }
}

//this.currentSelectedNode.toggleActivated();
//this.tree.treeModel.getFocusedNode().toggleActivated()
//this.tree.treeModel.setSelectedNode(this.currentSelectedNode)
//TREE_ACTIONS.DESELECT(this.tree, this.currentSelectedNode, event);

//this.currentSelectedNode.setIsSelected(false);
//this.cdr.detectChanges();
//this.tree.treeModel.setSelectedNode(this.currentSelectedNode)
//TREE_ACTIONS.DESELECT(this.tree, this.currentSelectedNode, event);
