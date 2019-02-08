import { FirebaseReferences } from "../../../config/firebase";
import moment from 'moment';
import * as types from './types';

const intervalsActions = {
    removeIntervalByDate: function (intervalId, date) {
        return function (dispatch, getState) {
            return new Promise((resolve, reject) => {
                const userUid = getState().user.uid;
                const currentDay = moment().format('YYYY-MM-DD');

                FirebaseReferences.getDatabaseRef()
                    .child(`intervals/${userUid}/${date}/${intervalId}`)
                    .set(null)
                    .then(err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                            dispatch(intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay));
                        }
                    });
            });
        }
    },

    fetchIntervalsOnceByDateCurrentUser: function (date) {
        return function (dispatch, getState) {
            return new Promise((resolve, reject) => {
                dispatch(intervalsActions.fetchIntervalsBegin());
                let userUid = (getState().user) ? getState().user.uid : null;
                let userIntervalsRef = FirebaseReferences.getDatabaseRef().child(`intervals/${userUid}/${date}`);

                userIntervalsRef.once("value")
                    .then(snapshot => {
                        dispatch({
                            type: types.FETCH_INTERVALS,
                            payload: snapshot.val()
                        });
                        resolve(snapshot.val());
                    });
            })
        }
    },

    fetchIntervalsOnceByDateAndUid: function (date, uid) {
        return function (dispatch, getState) {
            return new Promise((resolve, reject) => {
                let userIntervalsRef = FirebaseReferences
                    .getDatabaseRef()
                    .child(`intervals/${uid}/${date}`);

                    userIntervalsRef.once("value")
                    .then(snapshot => {
                        resolve(snapshot.val());
                    });
            })

        }
    },

    fetchIntervalsBegin: function () {
        return {
            type: types.FETCH_INTERVALS_BEGIN
        }
    },

    addInterval: function (newInterval, date) {
        return function (dispatch, getState) {
            return new Promise((resolve, reject) => {
                let userUid = getState().user.uid;
                let currentDay = moment().format('YYYY-MM-DD');

                FirebaseReferences.getIntervalsRef()
                    .child(`${userUid}/${currentDay}`)
                    .push()
                    .set(newInterval)
                    .then(err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                            dispatch(intervalsActions.fetchIntervalsOnceByDateCurrentUser(currentDay));
                        }
                    });
            });
        }
    }
};

export { intervalsActions };