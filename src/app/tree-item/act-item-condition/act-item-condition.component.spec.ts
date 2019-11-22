import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActItemConditionComponent } from './act-item-condition.component';

describe('ActItemConditionComponent', () => {
  let component: ActItemConditionComponent;
  let fixture: ComponentFixture<ActItemConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActItemConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActItemConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
