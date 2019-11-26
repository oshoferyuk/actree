import {AfterContentInit, Component, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {UPDOWNKEYS} from "../../ActItem.constant";

@Component({
  selector: 'app-act-item-condition',
  templateUrl: './act-item-condition.component.html',
  styleUrls: ['./act-item-condition.component.scss']
})
export class ActItemConditionComponent implements OnInit, AfterContentInit, OnChanges {




  @Input('name') name: any; // array of pre + cond + post, make types
  @Input('selected') selected?: number; // if not undefined - means we have event of selected event on condition

  conditions = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.conditions = this.name;
  }

  ngOnChanges(){

  }



}
