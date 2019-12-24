// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains test for active configuration item condition tree component.
// </summary>

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { ActItemConditionComponent } from './act-item-condition.component';



describe('ActItemConditionComponent', () => {
  let component: ActItemConditionComponent;
  let fixture: ComponentFixture<ActItemConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MatIconModule],
        declarations: [ ActItemConditionComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
