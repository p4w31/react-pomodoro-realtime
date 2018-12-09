import * as types from "./types";

const defaultState = {
    flag: 'not_started'
};

const counterReducer = function(state = defaultState, action) {
    switch(action.type) {
        case types.CHANGE_COUNTER_DETAILS:
            return action.payload

        case types.CHANGE_COUNTER_DETAILS_TYPE:
            return {
                ...state,
                flag: action.payload.flag
            }

        default:
            return state
    }
}

export default counterReducer;