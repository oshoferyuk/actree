import {Directive, ElementRef, Host, HostListener, Optional, Renderer2} from '@angular/core';
import {TreeItemComponent} from "./tree-item.component";


@Directive({
  selector: 'tree-root33',
})
export class ActSelectionDirective {

  @HostListener('click') ddnewColor($event) {

 //   const levelNodes = this.el.nativeElement.querySelector('[class^="tree-node-level"]');

    //const test = this.el.nativeElement.querySelector('[class="node-wrapper"]');


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
              @Optional() @Host() public hostTreeRoot: TreeItemComponent) {

  }

}
