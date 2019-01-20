import { databaseRef, intervalsRef } from "../../../config/firebase";
import moment from 'moment';
import * as types from './types';
import { trackedUsersActions } from '../trackedUsers';

export function removeIntervalByDate(intervalId, date) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            let userUid = getState().user.uid;
            let currentDay = moment().format('YYYY-MM-DD');

            intervalsRef
                .child(userUid)
                .child(date)
                .child(intervalId)
                .set(null,
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                            dispatch(fetchIntervalsOnceByDateCurrentUser(currentDay));
                        }
                    }
                );
        });
    }
}

export function toggleIntervalCompleted(intervalId) {
    return {
        type: types.TOGGLE_INTERVAL_COMPLETED,
        payload: {
            id: intervalId
        }
    };
}

export function fetchIntervals() {
    return function(dispatch, getState) {
        dispatch(fetchIntervalsBegin());

        let userintervalsRef = databaseRef.child("intervals");
        userintervalsRef.on("value", snapshot => {
            dispatch({
                type: types.FETCH_INTERVALS,
                payload: snapshot.val()
            });
        });
    }
}

export function fetchIntervalsOnceByDateCurrentUser(date) {
    return function(dispatch, getState) {
        dispatch(fetchIntervalsBegin());
        let userUid = (getState().user) ? getState().user.uid : null;
        let userintervalsRef = databaseRef.child(`intervals/${userUid}/${date}`);

        userintervalsRef.once("value", snapshot => {
            dispatch({
                type: types.FETCH_INTERVALS,
                payload: snapshot.val()
            });
        });
    }
}

export function fetchIntervalsOnceByDateAndUid(date, uid) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            let userintervalsRef = databaseRef.child(`intervals/${uid}/${date}`);

            userintervalsRef.once("value", snapshot => {
                resolve(snapshot.val());
            });
        })
        
    }
}

export function fetchIntervalsOnceByDateAllUsers(date) {
    return function(dispatch, getState) {
        dispatch(trackedUsersActions.fetchTrackedUsers())
            .then(() => {
                getState().trackedUsers.items.forEach(({uid}) => {
                    dispatch(fetchIntervalsOnceByDateAndUid(date, uid));
                });

            })
            .catch((err) => {
                console.log('err');
                console.log(err);
            });
    }
}

export const fetchIntervalsBegin = () => ({
    type: types.FETCH_INTERVALS_BEGIN
});

export function addInterval(newInterval, date){
    return function(dispatch, getState){
        // API should add intervals in appropriate date keys; 
        // for now interval is stored in stop day subcollection
        return new Promise((resolve, reject) => {
            let userUid = getState().user.uid;
            let currentDay = moment().format('YYYY-MM-DD');

            intervalsRef
                .child(`${userUid}/${currentDay}`)
                .push()
                .set(newInterval, 
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                            dispatch(fetchIntervalsOnceByDateCurrentUser(currentDay));
                        }
                    }
                );
        });
    }
};
