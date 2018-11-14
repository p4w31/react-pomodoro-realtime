import * as types from '../constants/ActionTypes';

const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {

        case types.USER_SIGNED_IN:
            return action.payload.user;

        case types.USER_SIGNED_OUT:
            return null;

        default:
            return state;
    } 
};
