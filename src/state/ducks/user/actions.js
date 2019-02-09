import * as firebase from "firebase";
import * as types from './types';

const userActions = {
    getFirebaseAuth: function () {
        return firebase.auth()
    },

    signInWithEmailAndPassword: function (email, password) {
        return function (dispatch) {
            return userActions.getFirebaseAuth().signInWithEmailAndPassword(email, password);
        }
    },

    signOut: function () {
        return function (dispatch) {
            return userActions.getFirebaseAuth().signOut();
        }
    },

    userChanged: function (user) {
        return {
            type: types.USER_CHANGED,
            payload: { user: user }
        }
    },

    verifyAuth: function () {
        return function (dispatch) {
            return new Promise((resolve, reject) => {
                userActions.getFirebaseAuth().onAuthStateChanged(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                });
            });
        }
    }
};

export { userActions };