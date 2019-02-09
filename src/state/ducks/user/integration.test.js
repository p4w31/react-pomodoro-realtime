import { storeFactory } from '../../../test/helpers';
import { userActions } from './index';
import dbMocks from './dbMocks';

let store;
let initialState = {
    user: null
};

describe('Integration for user part of the store', () => {
    beforeEach(() => {
        store = storeFactory(initialState);
    });

    it('userChanged action dispatcher', () => {
        const paramsDB = dbMocks.getUser();

        store.dispatch( userActions.userChanged(paramsDB) );
        expect( store.getState().user ).toEqual(paramsDB);
    });
});