import { storeFactory } from '../../../test/helpers';
import { counterActions } from './index';

let store;
let initialState = {
    counterDetails: {
        countdownTime: 1500,
        countdownStart: 1548574970,
        countdownStop: 1548574971,
        type: "work",
        flag: "finished"
    }
};

describe('Integration for counterDetails part of the store', () => {
    beforeEach(() => {
        //given
        store = storeFactory(initialState);
    });

    it('setCounterDetails action dispatcher', () => {
        //given
        const params = {
            countdownTime: 3000,
            countdownStart: 1548519926,
            countdownStop: 1548519936,
            type: 'break',
            flag: 'started'
        };

        //when
        store.dispatch( counterActions.setCounterDetails(params) );

        //then
        expect( store.getState().counterDetails ).toEqual(params);
    });

    it('setCounterDetailsType action dispatcher', () => {
        //when
        store.dispatch( counterActions.setCounterDetailsType('started') );
        
        //then
        expect( store.getState().counterDetails ).toEqual({
            ...initialState.counterDetails,
            flag: 'started'
        });
    });
});