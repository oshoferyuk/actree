// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains test for active configuration item tree component.
// </summary>

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';

import { ActItemComponent } from './act-item.component';

describe('ActItemComponent', () =>
{
    let component: ActItemComponent;
    let fixture: ComponentFixture<ActItemComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ActItemComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ActItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should add class if node is conditional', () =>
    {
        component.renderer.addClass = jasmine.createSpy('ActItemComponent_addClass');
        component.renderer.setAttribute = jasmine.createSpy('ActItemComponent_setAttribute');
        component.renderer.parentNode = jasmine
            .createSpy('ActItemComponent_parentNode')
            .and.returnValue({ className: ['tree-node'] });
        component.type = true;

        component.ngAfterViewInit();

        expect(component.renderer.addClass).toHaveBeenCalled();
        expect(component.renderer.setAttribute).toHaveBeenCalled();
    });

    it('should trigger captured on onCaptured', () =>
    {
        component.captured = ({
            next: jasmine.createSpy('ActItemComponent_setAttribute')
        } as unknown) as EventEmitter<number>;

        component.onCaptured(1);

        expect(component.captured.next).toHaveBeenCalled();
    });
});
