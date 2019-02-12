import { storeFactory } from '../../../test/helpers';
import { userActions } from './index';
import dbMocks from './dbMocks';

let store;
let initialState = {
    user: null
};

describe('Integration for user part of the store', () => {
    beforeEach(() => {
        //given
        store = storeFactory(initialState);
    });

    it('userChanged action dispatcher', () => {
        //given
        const paramsDB = dbMocks.getUser();

        //when
        store.dispatch( userActions.userChanged(paramsDB) );

        //then
        expect( store.getState().user ).toEqual(paramsDB);
    });
});