import * as types from "./types";

const initialState = null;

const userReducer = function(state = initialState, action) {
    switch (action.type) {

        case types.USER_SIGNED_IN:
            return action.payload.user;

        case types.USER_SIGNED_OUT:
            return null;

        default:
            return state;
    } 
}

export default userReducer;