import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material';

import { ActNavComponent } from './act-nav.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ActNavComponent', () => {
  let component: ActNavComponent;
  let fixture: ComponentFixture<ActNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MatIconModule],
        declarations: [ ActNavComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
