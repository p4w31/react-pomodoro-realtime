import * as firebase from "firebase";

export function signInWithEmailAndPassword(email, password) {
    return function(dispatch) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}

export function signOut() {
    return function(dispatch) {
        return firebase.auth().signOut();
    }
}

export function userSignedIn(user) {
    return {
        type: 'USER_SIGNED_IN',
        payload: { user: user }
    }
}

export function userSignedOut() {
    return { type: 'USER_SIGNED_OUT' }
}

export function verifyAuth() {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }
}