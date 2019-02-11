import { FirebaseReferences } from "../../../config/firebase";
import * as types from './types';
import { intervalsActions } from '../intervals';

export const fetchTrackedUsersBegin = () => ({
    type: types.FETCH_TRACKED_USERS_BEGIN
});

const trackedUsersActions = {

    /**
     * TODO: 
     * - refactor to be more readable and easy for unit testing
     * - add unit tests
     */
    fetchTrackedUsers: function (date) {
        return function (dispatch, getState) {
            dispatch(fetchTrackedUsersBegin());
            let userUid = (getState().user) ? getState().user.uid : null;
            let trackedUsersRef = FirebaseReferences.getDatabaseRef().child(`trackedUsers/${userUid}`);

            trackedUsersRef.once("value", snapshot => {
                let trackedUsers = snapshot.val();
                let trackedUsersIntervalsPromises = [];

                for (let key in trackedUsers) {
                    trackedUsersIntervalsPromises.push(
                        dispatch(intervalsActions.fetchIntervalsOnceByDateAndUid(date, trackedUsers[key].uid))
                            .then((data) => {
                                trackedUsers[key].intervals = data;
                            })
                    );
                }

                Promise.all(trackedUsersIntervalsPromises).then((data) => {
                    dispatch({
                        type: types.FETCH_TRACKED_USERS,
                        payload: trackedUsers
                    });
                });
            });

        }
    }

};

export { trackedUsersActions };