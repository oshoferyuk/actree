import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Store, StoreModule} from '@ngrx/store';

import { counterReducer } from '../counter.reducer';
import {MyCounterComponent} from "./my-counter.component";

import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}


describe('MyCounterComponent', () => {
  let component: MyCounterComponent;
  let fixture: ComponentFixture<MyCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyCounterComponent],
      imports: [StoreModule],
    providers: [{ provide: Store, useClass: TestStore }]
    }).compileComponents();

    // fixture = TestBed.createComponent(MyCounterComponent);
    // component = fixture.debugElement.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
