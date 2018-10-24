import * as firebase from "firebase";
import { FirebaseConfig } from "./keys";

firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const intervalsRef = databaseRef.child("intervals");

