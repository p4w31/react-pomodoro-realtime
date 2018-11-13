export function setCounterDetails(countdownTime, countdownStart, countdownStop, type, flag) {
    return {
        type: 'CHANGE_COUNTER_DETAILS',
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
        type: 'CHANGE_COUNTER_DETAILS_TYPE',
        payload: {
            flag
        }
    };
}

export function addInterval(interval) {
    return {
        type: 'ADD_INTERVAL',
        payload: interval
    };
}