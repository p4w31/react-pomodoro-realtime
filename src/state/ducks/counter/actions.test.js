import { counterActions } from './actions';
import * as types from './types';

describe('Action setCounterDetails', () => {
    it('returns correct action', () => {
        //given
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
        //when
        const action = counterActions.setCounterDetails(params);

        //then
        expect(action).toEqual(expectedAction);
    });
});

describe('Action setCounterDetailsType', () => {
    it('returns correct action', () => {
        //given
        const param = 'finished';
        const expectedAction = {
            type:  types.CHANGE_COUNTER_DETAILS_TYPE,
            payload: { flag: param }
        }

        //when
        const action = counterActions.setCounterDetailsType(param);

        //then
        expect(action).toEqual(expectedAction);
    });
});