// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains test for active configuration tree component.
// </summary>

import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of } from 'rxjs/index';
import { TreeModule } from 'angular-tree-component';
import { MatIconModule } from '@angular/material';

import { ActComponent } from './act.component';
import { ActDataService } from './act-helpers/act.data.service';
import { ActSelectionService } from './act-helpers/act.selection.service';
import { ActMappingService } from './act-helpers/act.mapping.service';
import { ActScrollService } from './act-helpers/act.scroll.service';

describe('ActComponent', () =>
{
    let component: ActComponent;
    let fixture: ComponentFixture<ActComponent>;

    beforeEach(async(() =>
    {
        const selectSpy = jasmine.createSpy('ActComponent_selectSpy').and.returnValue(of([]));
        TestBed.configureTestingModule({
            imports: [CommonModule, TreeModule.forRoot(), MatIconModule],
            declarations: [ActComponent],
            providers: [
                {
                    provide: ActDataService,
                    useValue: {
                        actData: of({}),
                        select: selectSpy
                    }
                },
                {
                    provide: ActScrollService,
                    useValue: {
                        moveScroll: jasmine.createSpy('ActComponent_moveScrollSpy')
                    }
                },
                { provide: ActMappingService, useValue: {} },
                {
                    provide: ActSelectionService,
                    useValue: {
                        selectGetNodeLevels: jasmine.createSpy(
                            'ActComponent_selectGetNodeLevelsSpy'
                        ),
                        selectActive: jasmine.createSpy('ActComponent_selectActiveSpy'),
                        selectNavigation: jasmine.createSpy('ActComponent_selectNavigationSpy'),
                        selectGetLevelClassName: jasmine.createSpy(
                            'ActComponent_selectGetLevelClassNameSpy'
                        ),
                        selectGetAllSiblings: jasmine.createSpy(
                            'ActComponent_selectAllSiblingsSpy'
                        ),
                        selectGetGroupSiblings: jasmine.createSpy(
                            'ActComponent_selectGetAllSiblingSpy'
                        ),
                        selectPostActive: jasmine.createSpy('ActComponent_selectPostActiveSpy'),
                        deactivateActiveNode: jasmine.createSpy(
                            'ActComponent_deactivateActiveNodeSpy'
                        ),
                        selectClean: jasmine.createSpy('ActComponent_selectCleanSpy'),
                        cleanSiblingActiveGroup: jasmine.createSpy(
                            'ActComponent_cleanSiblingActiveGroupSpy'
                        )
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ActComponent);
        component = fixture.componentInstance;
        component.getFirstSelectedTreeNode = jasmine
            .createSpy('ActComponent_getFirstSelectedTreeNodeSpy')
            .and.returnValue({
                mouseAction: jasmine.createSpy('ActComponent_mouseActionSpy')
            });
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('Option', () =>
    {
        it('should have tree levelPadding', () =>
        {
            expect(component.options.levelPadding).toEqual(30);
        });

        // ...
    });

    describe('Configuration', () =>
    {
        it('should have tree levelPadding', () =>
        {
            expect(component.treeData).toBeDefined();
        });
    });

    describe('Common', () =>
    {
        it('should expand all tree', () =>
        {
            component.tree.treeModel.expandAll = jasmine.createSpy('ActComponent_treeExpand');
            component.ngAfterViewInit();
            expect(component.tree.treeModel.expandAll).toHaveBeenCalled();
        });
    });

    describe('onFocus', () =>
    {
        beforeEach(() =>
        {
            component.cleanSelection = jasmine.createSpy('ActComponent_cleanSelectionSpy');
            component.helpSelection = jasmine.createSpy('ActComponent_helpSelectionSpy');
        });

        it('should set focus truly', () =>
        {
            component.onFocus({});

            expect(component.focused).toBeTruthy();
        });

        it('should invoke cleanSelection', () =>
        {
            component.onFocus({});

            expect(component.cleanSelection).toHaveBeenCalled();
        });

        it('should invoke helpSelection', () =>
        {
            component.onFocus({});

            expect(component.helpSelection).toHaveBeenCalled();
        });
    });

    describe('onClick', () =>
    {
        beforeEach(() =>
        {
            component.cleanSelection = jasmine.createSpy('ActComponent_cleanSelectionSpy');
            component.helpSelection = jasmine.createSpy('ActComponent_helpSelectionSpy');
        });

        it('should set focus false', () =>
        {
            const event = { target: { nodeName: '' } };
            component.onClick(event);
            expect(component.focused).toBeFalsy();
        });

        it('should deactivate active nodes', () =>
        {
            const event = { target: { nodeName: '' } };
            component.onClick(event);
            expect(component.selectionHelper.deactivateActiveNode).toHaveBeenCalled();
        });

        it('should clean selection', () =>
        {
            const event = { target: { nodeName: '' } };
            component.onClick(event);
            expect(component.cleanSelection).toHaveBeenCalled();
        });

        it('should invoke help selection', () =>
        {
            const event = { target: { nodeName: '' } };
            component.onClick(event);
            expect(component.helpSelection).toHaveBeenCalled();
        });
    });

    describe('cleanSelection', () =>
    {
        it('should empty all nodeLevels', () =>
        {
            component.cleanSelection();
            expect(component.nodeLevels).toEqual([]);
        });
    });

    describe('helpSelection', () =>
    {
        beforeEach(() =>
        {
            component.helpSelection(null, true, null, null);
        });

        it('should get NodeLevels', () =>
        {
            expect(component.selectionHelper.selectGetNodeLevels).toHaveBeenCalled();
        });
        it('should select active', () =>
        {
            expect(component.selectionHelper.selectActive).toHaveBeenCalled();
        });

        it('should select navigation', () =>
        {
            expect(component.selectionHelper.selectNavigation).toHaveBeenCalled();
        });

        it('should get level class name', () =>
        {
            expect(component.selectionHelper.selectGetLevelClassName).toHaveBeenCalled();
        });

        it('should get all siblings', () =>
        {
            expect(component.selectionHelper.selectGetAllSiblings).toHaveBeenCalled();
        });

        it('should get group sibling', () =>
        {
            expect(component.selectionHelper.selectGetGroupSiblings).toHaveBeenCalled();
        });

        it('should select post active', () =>
        {
            expect(component.selectionHelper.selectPostActive).toHaveBeenCalled();
        });
    });
});
