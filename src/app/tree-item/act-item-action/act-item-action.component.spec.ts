import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActItemActionComponent } from './act-item-action.component';

describe('ActItemActionComponent', () => {
  let component: ActItemActionComponent;
  let fixture: ComponentFixture<ActItemActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActItemActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActItemActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
