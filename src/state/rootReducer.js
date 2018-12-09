import { combineReducers } from 'redux';
import * as reducers from "./ducks";

const rootReducer = combineReducers({
    user: reducers.UserReducer,
    intervals: reducers.IntervalsReducer,
    counterDetails: reducers.CounterDetailsReducer
});

export default rootReducer;