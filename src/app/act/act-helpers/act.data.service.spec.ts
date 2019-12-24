// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains tests for generator service.
// </summary>

import { of } from 'rxjs/index';
import { ActDataService } from '@admc-common/shared/act/act-helpers/act.data.service';

describe('ActDataService', () =>
{
    let sut;

    beforeEach(() =>
    {
        sut = new ActDataService();
    });

    describe('ActDataService', () =>
    {
        it('should define actData', () =>
        {
            expect(sut.actData).toBeDefined();
        });

        it('should set state', () =>
        {
            sut.actData = of(1);
            sut.actData.subscribe(data =>
            {
                expect(data).toEqual(1);
            });
        });

        it('should select observable', () =>
        {
            const notSubject = sut.select();
            expect(notSubject.next).not.toBeDefined();
        });
    });
});
