// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains tests for generator service.
// </summary>

import { ActSelectionService } from './act.selection.service';
import { ActDataService } from '@admc-common/shared/act/act-helpers/act.data.service';

describe('ActDataService', () =>
{
    let sut;
    let render;
    beforeEach(() =>
    {
        sut = new ActSelectionService();
        render = {
            addClass: jasmine.createSpy('ActDataService_addClassSpy'),
            removeClass: jasmine.createSpy('ActDataService_removeClassSpy')
        };
    });

    describe('ActSelectionService', () =>
    {
        describe('selectActive', () =>
        {
            it('should invoke selectClean', () =>
            {
                sut.selectClean = jasmine.createSpy('ActDataService_selectCleanSpy');

                sut.selectActive(render, [{}], null);

                expect(sut.selectClean).toHaveBeenCalled();
            });

            it('should add active to selected node', () =>
            {
                const firstNode = {};
                sut.selectClean = jasmine.createSpy('ActDataService_selectCleanSpy');
                sut.selectActive(render, [firstNode, {}], null);

                expect(render.addClass).toHaveBeenCalledWith(firstNode, 'active');
            });

            it('should add active-first to top selected node', () =>
            {
                const lastNode = {};
                sut.selectClean = jasmine.createSpy('ActDataService_selectCleanSpy');
                sut.selectActive(render, [{}, lastNode], null);

                expect(render.addClass).toHaveBeenCalledWith(lastNode, 'active-first');
            });
        });

        describe('selectPostActive', () =>
        {
            it('should add post-after-active to next level 1 node after current level 1', () =>
            {
                const lastSibling = {};
                const afterNode = {};
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue([lastSibling, afterNode])
                    }
                };

                sut.selectPostActive(el, [{}, lastSibling], render);

                expect(render.addClass).toHaveBeenCalledWith(afterNode, 'post-after-active');
            });
        });

        describe('selectClean', () =>
        {
            it('should call removeClass for nodes', () =>
            {
                const node = {};
                const l = {};
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue([l])
                    }
                };

                sut.selectClean(render, [node], el);

                expect(render.removeClass).toHaveBeenCalledWith(node, 'active');
                expect(render.removeClass).toHaveBeenCalledWith(node, 'active-first');
                expect(render.removeClass).toHaveBeenCalledWith(l, 'post-after-active');
            });
        });

        describe('selectGetLevelClassName', () =>
        {
            it('should return current level class name', () =>
            {
                const level0 = { className: 'first second third' };
                expect(sut.selectGetLevelClassName([level0, {}])).toEqual('first');
            });
        });

        describe('selectGetAllSiblings', () =>
        {
            it('should return all siblings for one level deep', () =>
            {
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue(['test'])
                    }
                };
                const node = {};

                expect(sut.selectGetAllSiblings(el, [node], '')).toEqual(['test']);
            });

            it('should return all siblings for several levels deep', () =>
            {
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue(['test'])
                    }
                };
                const node = {
                    querySelectorAll: jasmine
                        .createSpy('ActDataService_querySelectorAllSpy')
                        .and.returnValue(['test'])
                };

                expect(sut.selectGetAllSiblings(el, [{}, node], '')).toEqual(['test']);
            });
        });

        describe('selectGetGroupSiblings', () =>
        {
            it('should invoke cleanSiblingActiveGroup', () =>
            {
                sut.cleanSiblingActiveGroup = jasmine.createSpy(
                    'ActDataService_cleanSiblingActiveGroupSpy'
                );
                sut.selectGetGroupSiblings(render, []);
                expect(sut.cleanSiblingActiveGroup).toHaveBeenCalled();
            });

            it('should invoke _getActiveGroupBoundaries', () =>
            {
                sut.cleanSiblingActiveGroup = jasmine.createSpy(
                    'ActDataService__getActiveGroupBoundariesSpy'
                );
                sut._getActiveGroupBoundaries = jasmine
                    .createSpy('ActDataService__getActiveGroupBoundariesSpy')
                    .and.returnValue({ start: 0, end: 1 });
                sut.selectGetGroupSiblings(render, []);
                expect(sut._getActiveGroupBoundaries).toHaveBeenCalled();
            });

            it('should add active-group for group elements', () =>
            {
                sut.cleanSiblingActiveGroup = jasmine.createSpy(
                    'ActDataService__getActiveGroupBoundariesSpy'
                );
                sut._getActiveGroupBoundaries = jasmine
                    .createSpy('ActDataService__getActiveGroupBoundariesSpy')
                    .and.returnValue({ start: 0, end: 1 });
                const firstEl = {};
                const secondEl = {};

                sut.selectGetGroupSiblings(render, [firstEl, secondEl]);

                expect(render.addClass).toHaveBeenCalledWith(firstEl, 'active-group');
                expect(render.addClass).toHaveBeenCalledWith(secondEl, 'active-group');
            });

            it('should return active group elements', () =>
            {
                sut.cleanSiblingActiveGroup = jasmine.createSpy(
                    'ActDataService__getActiveGroupBoundariesSpy'
                );
                sut._getActiveGroupBoundaries = jasmine
                    .createSpy('ActDataService__getActiveGroupBoundariesSpy')
                    .and.returnValue({ start: 0, end: 1 });
                const firstEl = {};
                const secondEl = {};

                expect(sut.selectGetGroupSiblings(render, [firstEl, secondEl])).toEqual([
                    firstEl,
                    secondEl
                ]);
            });
        });

        describe('selectNavigation', () =>
        {
            it('should remove active class for all conditional nodes', () =>
            {
                const activeEl = {};
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue([activeEl])
                    }
                };

                sut.selectNavigation(render, el, [el.nativeElement]);

                expect(render.removeClass).toHaveBeenCalledWith(activeEl, 'active');
            });

            it('should add active class for current conditional node', () =>
            {
                const activeEl = {};
                const el = {
                    nativeElement: {
                        querySelectorAll: jasmine
                            .createSpy('ActDataService_querySelectorAllSpy')
                            .and.returnValue([activeEl])
                    }
                };

                sut.selectNavigation(render, el, [el.nativeElement]);

                expect(render.addClass).toHaveBeenCalledWith(activeEl, 'active');
            });
        });

        describe('cleanSiblingActiveGroup', () =>
        {
            it('should remove active-group for all nodes', () =>
            {
                const el = {};
                sut.cleanSiblingActiveGroup(render, [el]);

                expect(render.removeClass).toHaveBeenCalledWith(el, 'active-group');
            });
        });

        describe('deactivateActiveNode', () =>
        {
            it('should invoke setIsActive with false', () =>
            {
                const treeNode = {
                    setIsActive: jasmine.createSpy('ActDataService_setIsActiveSpy'),
                    blur: jasmine.createSpy('ActDataService_blurSpy'),
                    data: { selected: 0 }
                };

                sut.deactivateActiveNode(treeNode);

                expect(treeNode.setIsActive).toHaveBeenCalledWith(false);
                expect(treeNode.blur).toHaveBeenCalled();
                expect(treeNode.data.selected).toEqual(-1);
            });
        });
    });
});
