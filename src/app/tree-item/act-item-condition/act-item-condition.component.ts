import {
  AfterContentInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {UPDOWNKEYS} from "../../ActItem.constant";

@Component({
  selector: 'app-act-item-condition',
  templateUrl: './act-item-condition.component.html',
  styleUrls: ['./act-item-condition.component.scss']
})
export class ActItemConditionComponent implements AfterContentInit {
  @Input('name') name: any; // array of pre + cond + post, make types
  @Input('selected') selected?: number; // if not undefined - means we have event of selected event on condition
  @Output() captured = new EventEmitter<number>();

  conditions = [];

  constructor(public renderer: Renderer2, public el: ElementRef) {
  }

  ngAfterContentInit(){
    this.conditions = this.name;
  }

  onClick({target}){

    if(target.className.includes('node-content-condition')){
      //this.renderer.addClass(target, 'node-content-condition--active');
      const index = target.getAttribute('data-condition-index');
      this.captured.emit(index);
    }
  }
}
