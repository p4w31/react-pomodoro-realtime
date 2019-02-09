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
        store = storeFactory(initialState);
    });

    it('fetchIntervalsBegin action dispatcher', () => {
        store.dispatch( intervalsActions.fetchIntervalsBegin() );
        expect( store.getState().intervals ).toEqual({
            ...initialState.intervals,
            loading: true
        });
    });

});