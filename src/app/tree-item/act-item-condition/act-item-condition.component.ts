import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-act-item-condition',
  templateUrl: './act-item-condition.component.html',
  styleUrls: ['./act-item-condition.component.scss']
})
export class ActItemConditionComponent implements OnInit {

  @Input('name') name: any; // array of pre + cond + post, make types
  constructor() { }

  ngOnInit() {
  }

}
