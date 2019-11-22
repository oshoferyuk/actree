import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[.tree-node888]'
})
export class ActSelectionSdDirective {
  @HostBinding('class.activexxxxxxxxxxxxxxxxx') private _addActive = false;
  constructor(public el: ElementRef) { }

  test(){
    console.log('TEST');
    this._addActive = true;
  }
}
