import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-act-item-action',
  templateUrl: './act-item-action.component.html',
  styleUrls: ['./act-item-action.component.scss']
})
export class ActItemActionComponent implements OnInit {

  @Input('name') name: string;
  constructor() { }

  ngOnInit() {
  }

  activate(){

  }
}
