import { setCounterDetails, setCounterDetailsType } from './actions';
import * as types from './types';

describe('Action setCounterDetails', () => {
    it('returns correct action', () => {
        const params = {
            countdownTime: 1500,
            countdownStart: 1548519926,
            countdownStop: 1548519936,
            type: 'work',
            flag: 'finished'
        };
        const expectedAction = {
            type:  types.CHANGE_COUNTER_DETAILS,
            payload: params
        }
        const action = setCounterDetails(params);

        expect(action).toEqual(expectedAction);
    });
});

describe('Action setCounterDetailsType', () => {
    it('returns correct action', () => {
        const param = 'finished';
        const expectedAction = {
            type:  types.CHANGE_COUNTER_DETAILS_TYPE,
            payload: { flag: param }
        }
        const action = setCounterDetailsType(param);

        expect(action).toEqual(expectedAction);
    });
});