import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ACT_ITEMS} from "../ActItem.constant";


@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements OnInit, AfterViewInit  {
  @Input('type') type: number; // ACT_ITEMS
  @Input('data') data: number; // ACT_ITEMS
  @Input('name') name: string; // change to more complex, especially for condition
  @Input('condPos') condPos: string; // CONDITION POSITION pass only to condition

  constructor(public renderer: Renderer2, public el: ElementRef) { }


  ngOnInit() {
  }

  ngAfterViewInit(){

    if(this.type === ACT_ITEMS.CONDITION){

      // tree-node
      let levelNode = this.renderer.parentNode(this.el.nativeElement);
      while (!levelNode.className.includes('tree-node')) {
        levelNode = this.renderer.parentNode(levelNode);
        }
      this.renderer.addClass(levelNode, this.condPos);
      this.renderer.setAttribute(levelNode, "data", "" + this.data); // set data attribute to pass to selection section mechanism
      }

  }

}
