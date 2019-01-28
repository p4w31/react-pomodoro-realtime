import * as types from './types';

export function setCounterDetails({countdownTime, countdownStart, countdownStop, type, flag}) {
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
}

export function setCounterDetailsType(flag) {
    return {
        type: types.CHANGE_COUNTER_DETAILS_TYPE,
        payload: {
            flag
        }
    };
}