import * as types from '../constants/ActionTypes';

export function setCounterDetails(countdownTime, countdownStart, countdownStop, type, flag) {
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

export function addInterval(interval) {
    return {
        type: types.ADD_INTERVAL,
        payload: interval
    };
}