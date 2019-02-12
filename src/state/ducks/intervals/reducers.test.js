import reducer from './reducers';
import * as types from "./types";
import dbMocks from './dbMocks';

describe('Reducer intervalsReducer', () => {
    let initialState;

    beforeEach(() => {
        //given
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
        //when
        const newState = reducer(undefined, {});

        //then
        expect(newState).toEqual({ items: [], loading: false });
    });

    it('return proper state when action types.FETCH_INTERVALS passed', () => {
        //given
        const action = {
            type: types.FETCH_INTERVALS,
            payload: dbMocks.getIntervals()
        };

        //when
        const newState = reducer(initialState, action);
        
        //then
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
        //given
        const action = {
            type: types.FETCH_INTERVALS_BEGIN
        };

        //when
        const newState = reducer(initialState, action);

        //then
        expect(newState).toEqual({
            ...initialState,
            loading: true
        });
    });

    it('handles action with unknown type', () => {
        //given
        const action = {
            type: 'ASDFASDF'
        };

        //when
        const newState = reducer(initialState, action);

        //then
        expect(newState).toEqual(initialState);
    });
});