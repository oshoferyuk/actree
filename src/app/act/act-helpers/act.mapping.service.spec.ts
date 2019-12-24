// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains tests for active configuration mapping service.
// </summary>

import { ActMappingService } from './act.mapping.service';
import { TREE_ACTIONS } from 'angular-tree-component';
import { upDownKeys } from '@admc-common/shared/act/act-helpers/act.data.constant';

describe('ActMappingService', () =>
{
    let sut;
    let tree;
    let node;
    let firstLastNode;
    let clickEvent;

    beforeEach(() =>
    {
        sut = new ActMappingService();
        sut.isNodeConditinal = jasmine.createSpy('ActMapping_isNodeConditinalSpy');

        TREE_ACTIONS.ACTIVATE = jasmine.createSpy('ActMapping_TREE_ACTIONS_ActivateSpy');
        TREE_ACTIONS.PREVIOUS_NODE = jasmine.createSpy('ActMapping_TREE_ACTIONS_PreviousNodeSpy');
        TREE_ACTIONS.NEXT_NODE = jasmine.createSpy('ActMapping_TREE_ACTIONS_NextNodeSpy');

        tree = {
            setActiveNode: jasmine.createSpy('ActMapping_setActiveNodeSpy')
        };
        node = {
            data: { selected: 1 },
            setIsActive: jasmine.createSpy('ActMapping_setIsActiveSpy'),
            findPreviousNode: jasmine
                .createSpy('ActMapping_findPreviousNodeSpy')
                .and.returnValue({ data: { selected: 1, name: ['1', '2'] } }),
            findNextNode: jasmine
                .createSpy('ActMapping_findNextNodeSpy')
                .and.returnValue({ data: { selected: 1, name: ['3', '4'] } })
        };

        firstLastNode = {
            data: {selected: false},
            setActiveAndVisible: jasmine.createSpy('ActMapping_setActiveAndVisibleSpy')
        };

        clickEvent = {
            target: {
                classList: {
                    contains: jasmine.createSpy('ActMapping_containsSpy').and.returnValue(true)
                }
            }
        };
    });

    describe('onClick', () =>
    {
        it('should invoke ACTIVATE', () =>
        {
            sut.onClick(null, node, clickEvent);
            expect(TREE_ACTIONS.ACTIVATE).toHaveBeenCalled();
        });

        it('should capture node', () =>
        {
            sut.capturedNode = { data: {} };
            sut.onClick(null, node, clickEvent);

            expect(sut.capturedNode).toEqual(node);
        });

        it('should select capture node', () =>
        {
            sut.captured = true;
            sut.capturedIndex = {};

            sut.onClick(null, node, clickEvent);

            expect(node.data.selected).toEqual(sut.capturedIndex);
        });
    });

    describe('onKeysUp', () =>
    {
        xit('should invoke PREVIOUS_NODE if node is not captured', () =>
        {
            sut.captured = false;
            sut.capturedNode = true;

            sut.onKeysUp(tree, node, null, firstLastNode);

            expect(TREE_ACTIONS.PREVIOUS_NODE).toHaveBeenCalled();
        });

        it('should set key as keyup', () =>
        {
            sut.captured = false;
            sut.capturedNode = true;

            sut.onKeysUp(tree, node, null, firstLastNode);

            expect(sut.key).toEqual(upDownKeys.UP);
        });

        xit('should set captured if node conditional', () =>
        {
            sut.isNodeConditinal = jasmine
                .createSpy('ActMapping_isNodeConditionalSpy')
                .and.returnValue(true);
            sut.captured = false;
            sut.capturedIndex = {};

            sut.onKeysUp(tree, node, null, firstLastNode);

            expect(sut.captured).toBeTruthy();
            expect(sut.capturedIndex).toBe(1);
        });

        it('should release captured index for captured node', () =>
        {
            sut.captured = true;
            sut.capturedNode = {
                data: { selected: 1 },
                findPreviousNode: jasmine
                    .createSpy('ActMapping_findPreviousNodeSpy')
                    .and.returnValue({ data: { selected: 1, name: ['1', '2'] } })
            };
            sut.capturedIndex = -1;
            node = {findPreviousNode: jasmine.createSpy('ActMapping_findPreviousNodeNSpy').and.returnValue(true)};

            sut.onKeysUp(tree, node, null, firstLastNode);

            expect(sut.captured).toBeFalsy();
        });
    });

    describe('onKeysDown', () =>
    {

        it('should set captured if node conditional', () =>
        {
            sut.isNodeConditinal = jasmine
                .createSpy('ActMapping_isNodeConditionalSpy')
                .and.returnValue(true);
            sut.captured = false;
            sut.capturedIndex = {};

            sut.onKeysDown(tree, node, null, firstLastNode);

            expect(sut.captured).toBeTruthy();
            expect(sut.capturedIndex).toBe(0);
            expect(sut.capturedNode.data.selected).toEqual(sut.capturedIndex);
        });

        xit('should release captured index for captured node', () =>
        {
            sut.captured = true;
            sut.capturedNode = {
                data: { selected: 1, name: [] },
                findNextNode: jasmine
                    .createSpy('ActMapping_findNextNodeSpy')
                    .and.returnValue({ data: { selected: 1, name: ['1', '2'] } })
            };
            sut.capturedIndex = -1;
            node = false;

            sut.onKeysDown(tree, node, null, firstLastNode);

            expect(sut.captured).toBeFalsy();
        });
    });
});
