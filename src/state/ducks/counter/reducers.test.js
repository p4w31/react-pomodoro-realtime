import reducer from './reducers';
import * as types from "./types";

describe('Reducer counterReducer', () => {
    let initialState;

    beforeEach(() => {
        //given
        initialState = {
            countdownTime: 1500,
            countdownStart: 1548574970,
            countdownStop: 1548574971,
            type: "work",
            flag: "finished"
        };
    });

    it('return default initial state when no action passed', () => {
        //when
        const newState = reducer(undefined, {});
        //then
        expect(newState).toEqual({ flag: 'not_started' });
    });

    it('return proper state when action types.CHANGE_COUNTER_DETAILS passed', () => {
        //given
        const action = {
            type: types.CHANGE_COUNTER_DETAILS,
            payload: {
                countdownTime: 3000,
                countdownStart: 1548519926,
                countdownStop: 1548519936,
                type: 'break',
                flag: 'in_progress'
            }
        };

        //when
        const newState = reducer(initialState, action);
        
        //then
        expect(newState).toEqual(action.payload);
    });

    it('return proper state when action types.CHANGE_COUNTER_DETAILS_TYPE passed', () => {
        //given
        const action = {
            type: types.CHANGE_COUNTER_DETAILS_TYPE,
            payload: {
                flag: 'started'
            }
        };

        //when
        const newState = reducer(initialState, action);

        //then
        expect(newState).toEqual({
            ...initialState,
            flag: action.payload.flag
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