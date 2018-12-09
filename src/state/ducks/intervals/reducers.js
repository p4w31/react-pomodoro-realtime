import * as types from "./types";
import _ from 'lodash';

const initialState = {
    items: [],
    loading: false
};

const intervalsReducer = function(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_INTERVALS:
            let newState = [];

            for(let key in action.payload) {
                let data = action.payload[key];

                newState.push({
                    key: key,
                    data: data
                });
            }

            return {
                items: newState,
                loading: false
            };

        case types.FETCH_INTERVALS_BEGIN:
            return {
                ...state,
                loading: true
            };

        case types.TOGGLE_INTERVAL_COMPLETED:
            return _.map(state, (item) => {
                return (item.id === action.payload.id)
                    ? { ...item, completed: !item.completed }
                    : item;
            });

        default:
            return state;
    }
}

export default intervalsReducer;