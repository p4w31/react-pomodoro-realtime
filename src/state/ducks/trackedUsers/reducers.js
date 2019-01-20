import * as types from "./types";

const initialState = {
    items: [],
    loading: false
};

const trackedUsersReducer = function(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_TRACKED_USERS:
            let newState = [];

            for(let key in action.payload) {
                let {uid, username, intervals} = action.payload[key];

                newState.push({
                    uid,
                    username,
                    intervals : parseIntervals(intervals)
                });
            }

            return {
                items: newState,
                loading: false
            };

        case types.FETCH_TRACKED_USERS_BEGIN:
            return {
                ...state,
                loading: true
            };
        

        default:
            return state;
    }
}

function parseIntervals(intervalsObj) {
    let newState = [];

    for(let key in intervalsObj) {
        let data = intervalsObj[key];

        newState.push({
            key: key,
            data: data
        });
    }

    return newState;
}

export default trackedUsersReducer;