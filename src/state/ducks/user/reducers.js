import * as types from "./types";

const defaultState = null;

const userReducer = function(state = defaultState, action) {
    switch (action.type) {

        case types.USER_CHANGED:
            return action.payload.user;

        default:
            return state;
    } 
}

export default userReducer;