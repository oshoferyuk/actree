import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlinedInputComponent } from './underlined-input.component';

describe('UnderlinedInputComponent', () => {
  let component: UnderlinedInputComponent;
  let fixture: ComponentFixture<UnderlinedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderlinedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderlinedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
