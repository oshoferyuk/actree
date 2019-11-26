import {Directive, ElementRef, Host, HostListener, Optional, Renderer2} from '@angular/core';
import {TreeItemComponent} from "../tree-item/tree-item.component";
import {ActSelectionSdDirective} from "./act-selection-sd.directive";

@Directive({
  selector: 'tree-root',
  providers: [{
    provide:ActSelectionSdDirective, useClass: ActSelectionSdDirective
  }]
})
export class ActSelectionDirective {

  @HostListener('click') newColor($event) {

    //const levelNodes = this.el.nativeElement.querySelector('[class^="tree-node-level"]');
//     console.log(this.el);
//     const levelNodes = this.el.nativeElement.querySelectorAll('tree-node'); // TODO ashof improve, not all, but levels if needed
// console.log('------------ levels');
// levelNodes.forEach((levelNode) => {
//   console.log(levelNode);
//   // this.renderer.removeClass(levelNode, 'active');
// })
//     console.log(levelNodes);
//     console.log('------------ levels end');

    //this.test.test();


    //const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    //this.color = this.borderColor = this.possibleColors[colorPick];

  // .closest(".near.ancestor")
  //   let parent = this.renderer.parentNode(event.target);
  //   console.log('888')
  //   console.log(parent);
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);
  //
  //   parent = this.renderer.parentNode(parent);
  //   console.log(parent);

    //this.renderer.addClass(grandparent, 'active');
  }
  constructor(public renderer: Renderer2, public el: ElementRef,
              @Host() public test: ActSelectionSdDirective,
              @Optional() @Host() public hostTreeRoot: TreeItemComponent) {

  }

}
