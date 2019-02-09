import reducer from './reducers';
import * as types from "./types";
import dbMocks from './dbMocks';

describe('Reducer intervalsReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
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
        };
    });

    it('return default initial state when no action passed', () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual({ items: [], loading: false });
    });

    it('return proper state when action types.FETCH_INTERVALS passed', () => {
        const action = {
            type: types.FETCH_INTERVALS,
            payload: dbMocks.getIntervals()
        };
        const newState = reducer(initialState, action);
        
        expect(newState).toEqual({
            items: [
                {
                    key: '-LYG9z1wQbGDMuDAtyCt',
                    data: {
                        start: 1549710000,
                        stop: 1549711800,
                        type: 'break'
                    }
                },
                {
                    key: '-LYGA00kzMYMO-o20gZ7',
                    data: {
                        start: 1549711800,
                        stop: 1549713600,
                        type: 'work'
                    }
                }
            ],
            loading: false
        });
    });

    it('return proper state when action types.FETCH_INTERVALS_BEGIN passed', () => {
        const action = {
            type: types.FETCH_INTERVALS_BEGIN
        };
        const newState = reducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            loading: true
        });
    });

    it('handles action with unknown type', () => {
        const action = {
            type: 'ASDFASDF'
        };
        const newState = reducer(initialState, action);

        expect(newState).toEqual(initialState);
    });
});