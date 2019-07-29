import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import * as css from '../theming.scss';
console.log(css);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'buttons2';
  testw: number;
  ngOnInit() {

    const css = 'a {color: pink;}';
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

}
