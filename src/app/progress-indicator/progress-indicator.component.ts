// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    The component draws a panel with running dots.
// </summary>

import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { dotDelay, triggerState } from './progress-indicator.constant';

@Component({
  selector: 'app-progress-indicator',
  animations: [
    trigger(`piTrigger`, [
      state('start', style({})),
      state('stop', style({})),
    transition('start => stop', [
      style({position: 'absolute'}),
      animate('{{timing}}', keyframes([
      style({transform: 'translateX({{translateX0}}px)', offset: 0.05, animationTimingFunction: 'cubic-bezier(0.01,0.75,1,1)'}),
      style({transform: 'translateX({{translateX1}}px)', offset: 0.28, animationTimingFunction: 'linear'}),
      style({transform: 'translateX({{translateX2}}px)', offset: 0.66, animationTimingFunction: 'cubic-bezier(0,0,0.99,0.25)'}),
      style({transform: 'translateX({{translateX3}}px)', offset: 0.8, animationTimingFunction: 'linear'}),
      style({transform: 'translateX({{translateX4}}px)', offset: 1.0, animationTimingFunction: 'linear'})
    ]))
      ], {params: {timing: '3.3s 0.0s'}})
    ]),
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit, AfterViewInit {

  @ViewChild('self', {static: false}) self: ElementRef;
  @Input() width?: number;
  @Input() bottom?: boolean;

  state1: {value, params};
  state2: {value, params};
  state3: {value, params};
  state4: {value, params};
  state5: {value, params};
  currentWidth: number;

  constructor() { }

  ngOnInit() {

    this.state1 = this.getState(triggerState.START, dotDelay.DOT1_DELAY);
    this.state2 = this.getState(triggerState.START, dotDelay.DOT2_DELAY);
    this.state3 = this.getState(triggerState.START, dotDelay.DOT3_DELAY);
    this.state4 = this.getState(triggerState.START, dotDelay.DOT4_DELAY);
    this.state5 = this.getState(triggerState.START, dotDelay.DOT5_DELAY);
  }

  ngAfterViewInit() {
    this.currentWidth = !!this.width ? this.width : this.self.nativeElement.parentElement.parentElement.clientWidth;
  }

  onDone($event: any): void {
    this.state1 = this.state1.value === triggerState.START
      ? this.getState(triggerState.STOP, dotDelay.DOT1_DELAY)
      : this.getState(triggerState.START, dotDelay.DOT1_DELAY);

    this.state2 = this.state2.value === triggerState.START
      ? this.getState(triggerState.STOP, dotDelay.DOT2_DELAY)
      : this.getState(triggerState.START, dotDelay.DOT2_DELAY);

    this.state3 = this.state3.value === triggerState.START
      ? this.getState(triggerState.STOP, dotDelay.DOT3_DELAY)
      : this.getState(triggerState.START, dotDelay.DOT3_DELAY);

    this.state4 = this.state4.value === triggerState.START
      ? this.getState(triggerState.STOP, dotDelay.DOT4_DELAY)
      : this.getState(triggerState.START, dotDelay.DOT4_DELAY);

    this.state5 = this.state5.value === triggerState.START
      ? this.getState(triggerState.STOP, dotDelay.DOT5_DELAY)
      : this.getState(triggerState.START, dotDelay.DOT5_DELAY);
  }

  getState(name: string, delay: string): {value, params} {
    const translateX0 = -5;
    const translateX1 = Math.ceil(this.currentWidth * 0.4);
    const translateX2 = Math.ceil(this.currentWidth * 0.58);
    const translateX3 = this.currentWidth + 5;
    const translateX4 = this.currentWidth + 5;
    return {value: name, params: {translateX0, translateX1, translateX2, translateX3, translateX4, timing: delay}};
  }
}
