import sinon from 'sinon';
import { userActions } from './actions';
import * as firebase from "firebase";
import * as types from './types';

describe('Action signInWithEmailAndPassword', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase signInWithEmailAndPassword with given mail and password', () => {
        const givenMail= 'mail@mail.com';
        const givenPassword= 'pswd';
        const stubSignInWithEmailAndPassword = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            signInWithEmailAndPassword: stubSignInWithEmailAndPassword
        });

        userActions.signInWithEmailAndPassword(givenMail, givenPassword)();
        expect(stubSignInWithEmailAndPassword.getCall(0).args[0]).toEqual(givenMail);
        expect(stubSignInWithEmailAndPassword.getCall(0).args[1]).toEqual(givenPassword);
    });
});

describe('Action signOut', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase signOut', () => {
        const stubSignOut = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            signOut: stubSignOut
        });
         
        userActions.signOut()();
        expect(stubSignOut.callCount).toEqual(1);
    });
});

describe('Action userChanged', () => {
    it('returns correct action', () => {
        const params = {
            uid: '123456',
            email: 'mail@mail.com'
        };
        const expectedAction = {
            type:  types.USER_CHANGED,
            payload: {user: params}
        }

        const action = userActions.userChanged(params);
        expect(action).toEqual(expectedAction);
    });
});

describe('Action verifyAuth', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('calls firebase onAuthStateChanged', () => {
        const stubOnAuthStateChanged = sinon.stub();
        const stubGetFirebaseAuth = sinon.stub(userActions, 'getFirebaseAuth').returns({
            onAuthStateChanged: stubOnAuthStateChanged
        });
         
        userActions.verifyAuth()();
        expect(stubOnAuthStateChanged.callCount).toEqual(1);
    });
});



