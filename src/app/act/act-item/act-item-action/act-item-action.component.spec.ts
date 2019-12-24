// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains test for active configuration item action tree component.
// </summary>

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { ActItemActionComponent } from './act-item-action.component';



describe('ActItemActionComponent', () => {
  let component: ActItemActionComponent;
  let fixture: ComponentFixture<ActItemActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MatIconModule],
        declarations: [ ActItemActionComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
