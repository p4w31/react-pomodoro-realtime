const defaultState = {
    flag: 'not_started'
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case 'CHANGE_COUNTER_DETAILS':
            return action.payload

        case 'CHANGE_COUNTER_DETAILS_TYPE':
            return {
                ...state,
                flag: action.payload.flag
            }

        default:
            return state
    }
}