import _ from 'lodash';

const initialState = {
    items: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_INTERVALS': 
            let newState = [];

            for(let key in action.payload) {
                let data = action.payload[key];

                newState.push({
                    key: key,
                    data: data
                });
            }

            //return newState;
            return {
                items: newState,
                loading: false
            };

        case 'FETCH_INTERVALS_BEGIN':
            return {
                ...state,
                loading: true
            };


        case 'ADD_INTERVAL':
            return [
                action.payload,
                ...state
            ];

        case 'REMOVE_INTERVAL':
            return _.filter(state, (item) => ( item.id !== action.payload.id ) );

        case 'TOGGLE_INTERVAL_COMPLETED':
            return _.map(state, (item) => {
                return (item.id === action.payload.id)
                    ? { ...item, completed: !item.completed }
                    : item;
            });

        default:
            return state;
    }
};
