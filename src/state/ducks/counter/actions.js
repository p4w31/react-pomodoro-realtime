import * as types from './types';

const counterActions = {
    setCounterDetails: function({countdownTime, countdownStart, countdownStop, type, flag}) {
        return {
            type: types.CHANGE_COUNTER_DETAILS,
            payload: {
                countdownTime,
                countdownStart, 
                countdownStop,
                type,
                flag
            }
        };
    },

    setCounterDetailsType: function(flag) {
        return {
            type: types.CHANGE_COUNTER_DETAILS_TYPE,
            payload: {
                flag
            }
        };
    }
}

export { counterActions }