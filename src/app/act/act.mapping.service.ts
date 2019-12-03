import { Injectable } from "@angular/core";
import {TREE_ACTIONS} from "angular-tree-component";
import {UPDOWNKEYS} from "../ActItem.constant";


@Injectable()
export class ActMappingService {


  capturedIndex: number;
  capturedNode;
  key: number = UPDOWNKEYS.UP;

  captured = false;// not used

  constructor() {

  }

  onClick(tree, node, $event){

      //this.deactivateActiveNode();
      if(this.captured){
        this.capturedNode = node;
        node.data.selected = this.capturedIndex;
      }
      //TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event);
      TREE_ACTIONS.ACTIVATE(tree, node, $event);
  }

  onKeysUp(tree, node, $event){

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
        this.capturedNode.data.selected = this.capturedIndex;
      }


      this.key = UPDOWNKEYS.UP;
      TREE_ACTIONS.PREVIOUS_NODE(tree, node, $event);
    }

  }

  onKeysDown(tree, node, $event) {

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
