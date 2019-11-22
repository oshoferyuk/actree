// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    The component draws a panel with running dots.
// </summary>

import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { dotDelay, triggerState } from './progress-indicator.constant';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

  @Input() width?: number;
  @Input() bottom?: boolean;

  constructor() { }

  ngOnInit() {
  }
}
