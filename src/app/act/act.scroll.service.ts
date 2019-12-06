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
console.log(nodeLevels[0]);
console.log(nodeLevels[nodeLevels.length - 1]);
    const firstNode = nodeLevels[nodeLevels.length - 1];

    const treeContainer = treeEl.nativeElement.querySelector('tree-viewport');

    if (this.isOutOfScrolledView(scrollNode, treeContainer, firstNode)) {

      if (key === UPDOWNKEYS.UP || scrollNode.clientHeight > window.innerHeight) {
        firstNode.scrollIntoView(true);
      } else {
        firstNode.scrollIntoView(false);
      }
    }

  }



  isOutOfScrolledView(element, container, first) {




    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    console.log('container top ' + cTop);
    console.log('container bottom ' + cBottom);

    //const eTop = element.offsetTop;
    //const eBottom = eTop + element.clientHeight;
    //console.log('element top ' + eTop);
    //console.log('element bottom ' + eBottom);

    //console.log('window ' +  window.innerHeight);

    const fTop = first.offsetTop;
    const fBottom = fTop + first.clientHeight;
    console.log('element top ' + fTop);
    console.log('element bottom ' + fBottom);
    //const cBottom = cTop + container.clientHeight;
    console.log('top top ' + fTop);


    // out
    return (fTop  < cTop || fBottom > cBottom);

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
