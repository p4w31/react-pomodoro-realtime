import { createSelector } from 'reselect';

const counterSelector = state => state.counterDetails

const getCounterDetails = (counterDetails) => {
    return counterDetails;
};

export default createSelector(
    counterSelector,
    getCounterDetails
);