import * as firebase from "firebase";
import { FirebaseConfig } from "./keys";

firebase.initializeApp(FirebaseConfig);

const FirebaseReferences = {

    getDatabaseRef: function() {
        return firebase.database().ref()
    },

    getIntervalsRef: function() {
        return firebase.database().ref().child("intervals")
    }

};

export { FirebaseReferences };