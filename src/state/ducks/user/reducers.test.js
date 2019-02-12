import reducer from './reducers';
import * as types from "./types";

describe('Reducer counterReducer', () => {
    let initialState;

    beforeEach(() => {
        //given
        initialState = {
            uid: '123456',
            email: 'mail@mail.com'
        };
    });

    it('return default initial state when no action passed', () => {
        //when
        const newState = reducer(undefined, {});

        //then
        expect(newState).toEqual(null);
    });

    it('return proper state when action types.USER_CHANGED passed', () => {
        //given
        const action = {
            type: types.USER_CHANGED,
            payload: {
                user: {
                    uid: 'uid2',
                    email: 'mail2@mail2.com'
                }
            }
        };

        //when
        const newState = reducer(initialState, action);

        //then
        expect(newState).toEqual(action.payload.user);
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