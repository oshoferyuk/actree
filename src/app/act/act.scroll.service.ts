import { Injectable } from "@angular/core";
import {ITreeNode} from "angular-tree-component/dist/defs/api";
import {UPDOWNKEYS} from "../ActItem.constant";


@Injectable()
export class ActScrollService {


  constructor() {

  }


  moveScroll(key,nodeLevels, treeEl, tree, node )
  {



    //tree.treeModel.virtualScroll.clear();
    //console.log('virtual total height --------------------> ' + tree.treeModel.virtualScroll.totalHeight);
    //console.log('virtual y --------------------> ' + tree.treeModel.virtualScroll.y);
    //console.log('virtual total yBlock --------------------> ' + tree.treeModel.virtualScroll.yBlocks);
    //console.log('virtual total viewPort height --------------------> ' + tree.treeModel.virtualScroll.viewportHeight);
    //tree.treeModel.virtualScroll.scrollIntoView(this);
    //tree.treeModel.virtualScroll.recalcPositions();
    //tree.treeModel.virtualScroll.fixScroll();

    //tree.treeModel.virtualScroll.scrollIntoView(node, true, false);
    node.scrollIntoView(true);

    return;

console.log('888888888888888888888888888');


    //const levelOneRelational = nodeLevels[nodeLevels.length - 1];

    const scrollContainer = treeEl.nativeElement.querySelector('tree-viewport');
    const scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
    const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
    console.log('--------------> ' + scrollContainerHeight);
    console.log('--------------> ' + scrollContainerTop);
    console.log('---------------> ' + node.position);

    const scrollNode = nodeLevels[0];
    //treeContainer.scrollTo(0, 100);


    //const scrollContainer = node.options.scrollContainer;



    if (this.isOutOfScrolledView(scrollNode, scrollContainer)) {

      // if (key === UPDOWNKEYS.UP || scrollNode.clientHeight > window.innerHeight) {
         //scrollNode.scrollIntoView(true);
       //} else {
        // scrollNode.scrollIntoView(false);
       //}
   }

  }



  isOutOfScrolledView(element, container) {

    if(!element){
      return false;
    }

    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;

    console.log('container top ' + cTop);
    console.log('container bottom ' + cBottom);

    const eTop = element.offsetTop;
    const eBottom = eTop + element.clientHeight;

    //const rTop = relational.offsetTop;
    //const rBottom = relational.clientHeight;

    console.log('element top ' + eTop);
    console.log('element bottom ' + eBottom);
    //console.log('window ' +  window.innerHeight);

    //console.log('eTop + rTop', eTop + rTop);
    // out
    console.log(eTop < cTop || eBottom > cBottom);

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
