import { storeFactory } from '../../../test/helpers';
import { intervalsActions } from './index';

let store;
let initialState = {
    intervals: {
        items: [
            {
                key: 'key1',
                data: {
                    start: 1549602000,
                    stop: 1549603200,
                    type: 'break'
                }
            },
            {
                key: 'key2',
                data: {
                    start: 1549603200,
                    stop: 1549604400,
                    type: 'break'
                }
            }
        ],
        loading: false
    }
};

describe('Integration for intervals part of the store', () => {
    beforeEach(() => {
        //given
        store = storeFactory(initialState);
    });

    it('fetchIntervalsBegin action dispatcher', () => {
        //when
        store.dispatch( intervalsActions.fetchIntervalsBegin() );

        //then
        expect( store.getState().intervals ).toEqual({
            ...initialState.intervals,
            loading: true
        });
    });

});