import * as types from '../constants/ActionTypes';

const defaultState = {
    flag: 'not_started'
};

export default function(state = defaultState, action) {
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