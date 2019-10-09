import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";

import { increment, decrement, reset } from '../counter.actions';
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent implements OnInit {

  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(increment());
  }
}
