import { createSelector } from 'reselect';

const intervalSelector = state => state.intervals

const getIntervals = (intervals) => {
    return intervals;
};

export default createSelector(
    intervalSelector,
    getIntervals
);