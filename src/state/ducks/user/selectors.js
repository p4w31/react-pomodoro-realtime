//import { createSelector } from 'reselect';

// const userSelector = state => state.user

// const getUser = (user) => {
//     return user;
// };

// export const getFullUser = createSelector(
//     userSelector,
//     getUser
// )

export const getUser = (state) => state.user

export const getUserEmail = (state) => {
    return state.user ? state.user.email : 'no data'
}

