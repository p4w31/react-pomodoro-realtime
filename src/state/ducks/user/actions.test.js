import sinon from 'sinon';
import { userActions } from './actions';
import * as types from './types';

describe('Action signInWithEmailAndPassword', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase signInWithEmailAndPassword with given mail and password', () => {
        //given
        const givenMail= 'mail@mail.com';
        const givenPassword= 'pswd';
        const stubSignInWithEmailAndPassword = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            signInWithEmailAndPassword: stubSignInWithEmailAndPassword
        });

        //when
        userActions.signInWithEmailAndPassword(givenMail, givenPassword)();

        //then
        expect(stubSignInWithEmailAndPassword.getCall(0).args[0]).toEqual(givenMail);
        expect(stubSignInWithEmailAndPassword.getCall(0).args[1]).toEqual(givenPassword);
    });
});

describe('Action signOut', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase signOut', () => {
        //given
        const stubSignOut = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            signOut: stubSignOut
        });
         
        //when
        userActions.signOut()();

        //then
        expect(stubSignOut.callCount).toEqual(1);
    });
});

describe('Action userChanged', () => {
    it('returns correct action', () => {
        //given
        const params = {
            uid: '123456',
            email: 'mail@mail.com'
        };
        const expectedAction = {
            type:  types.USER_CHANGED,
            payload: {user: params}
        }

        //when
        const action = userActions.userChanged(params);

        //then
        expect(action).toEqual(expectedAction);
    });
});

describe('Action verifyAuth', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase onAuthStateChanged', () => {
        //given
        const stubOnAuthStateChanged = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            onAuthStateChanged: stubOnAuthStateChanged
        });

        //when 
        userActions.verifyAuth()();

        //then
        expect(stubOnAuthStateChanged.callCount).toEqual(1);
    });
});



