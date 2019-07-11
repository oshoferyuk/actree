import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-progress-indicator',
  animations: [
    trigger(`signal`, [
      state('state11', style({ backgroundColor: 'blue' })),
      state('state12', style({ backgroundColor: 'blue' })),
      state('state21', style({ backgroundColor: 'blue' })),
      state('state22', style({ backgroundColor: 'blue' })),
      state('state31', style({ backgroundColor: 'blue' })),
      state('state32', style({ backgroundColor: 'blue' })),
      state('state41', style({ backgroundColor: 'blue' })),
      state('state42', style({ backgroundColor: 'blue' })),
      state('state51', style({ backgroundColor: 'blue' })),
      state('state52', style({ backgroundColor: 'blue' })),

    transition('* => *', [
      style({position: 'absolute'}),
      animate('{{timing}}', keyframes([
      style({transform: 'translateX({{translateX0}}px)', offset: 0.0, animationTimingFunction: 'cubic-bezier(0.01,0.75,1,1)'}),
      style({transform: 'translateX({{translateX1}}px)', offset: 0.28, animationTimingFunction: 'linear'}),
      style({transform: 'translateX({{translateX2}}px)', offset: 0.66, animationTimingFunction: 'cubic-bezier(0,0,0.99,0.25)'}),
      style({transform: 'translateX({{translateX3}}px)', offset: 0.8, animationTimingFunction: 'linear'}),
      style({transform: 'translateX({{translateX4}}px)', offset: 1.0, animationTimingFunction: 'linear'}),
    ]))
      ], {params: {width2: 50, timing: '3s 1s'}})

    ]),
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

  state1;
  state2;
  state3;
  state4;
  state5;

  constructor() { }

  ngOnInit() {

    this.state1 = this.getParameters('state11', '3s 0s');
    this.state2 = this.getParameters('state21', '3s 0.2s');
    this.state3 = this.getParameters('state31', '3s 0.4s');
    this.state4 = this.getParameters('state41', '3s 0.6s');
    this.state5 = this.getParameters('state51', '3s 0.8s');

  }

  stop(){

  }

  onDone($event: any){
    this.state1 = this.state1.value == 'state11' ? this.getParameters('state12', '3s 0s') : this.getParameters('state11', '3s 0s');
    this.state2 = this.state2.value == 'state21' ? this.getParameters('state22', '3s 0.2s') : this.getParameters('state21', '3s 0.2s');
    this.state3 = this.state3.value == 'state31' ? this.getParameters('state32', '3s 0.4s') : this.getParameters('state31', '3s 0.4s');
    this.state4 = this.state4.value == 'state41' ? this.getParameters('state42', '3s 0.6s') : this.getParameters('state41', '3s 0.6s');
    this.state5 = this.state5.value == 'state51' ? this.getParameters('state52', '3s 0.8s') : this.getParameters('state51', '3s 0.8s');
  }

  getParameters(name, delay){
    const base = 400;
    const translateX0 = -5;
    const translateX1 = base * 0.4;
    const translateX2 = base * 0.58;
    const translateX3 = base - 5;
    const translateX4 = base + 5;
    return {value: name, params: {width: '200', translateX0, translateX1, translateX2, translateX3, translateX4, timing: delay}};
  }
}
