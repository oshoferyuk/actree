// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains tests for generator service.
// </summary>

import { ActScrollService } from './act.scroll.service';

describe('ActScrollService', () =>
{
    let sut;

    beforeEach(() =>
    {
        sut = new ActScrollService();
    });

    describe('moveScroll', () =>
    {
        it('should invoke isOutOfScrolledView', () =>
        {
            const el = {};
            const treeEl = {nativeElement: {querySelector: jasmine.createSpy('ActScrollService_querySelectorSpy')}};
            sut.isOutOfScrolledView = jasmine.createSpy('ActScrollService_isOutOfScrolledViewSpy');
            sut.moveScroll(1, [el], treeEl);
        });

        // TODO: ashof, not complete
    });
});
