import reducer from './reducers';
import * as types from "./types";

describe('Reducer counterReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            uid: '123456',
            email: 'mail@mail.com'
        };
    });

    it('return default initial state when no action passed', () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual(null);
    });

    it('return proper state when action types.USER_CHANGED passed', () => {
        const action = {
            type: types.USER_CHANGED,
            payload: {
                user: {
                    uid: 'uid2',
                    email: 'mail2@mail2.com'
                }
            }
        };
        const newState = reducer(initialState, action);

        expect(newState).toEqual(action.payload.user);
    });

    it('handles action with unknown type', () => {
        const action = {
            type: 'ASDFASDF'
        };
        const newState = reducer(initialState, action);

        expect(newState).toEqual(initialState);
    });
});