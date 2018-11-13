import { createSelector } from 'reselect';

const userSelector = state => state.user

const getUser = (user) => {
    return user;
};

export default createSelector(
    userSelector,
    getUser
);