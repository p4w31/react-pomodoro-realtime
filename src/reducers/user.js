
const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {

        case 'USER_SIGNED_IN':
            return action.payload.user;

        case 'USER_SIGNED_OUT':
            return null;

        default:
            return state;
    } 
};
