import { combineReducers } from 'redux';
import IntervalsReducer from './intervals';
import UserReducer from './user';
import CounterDetailsReducer from './counter_details';

const rootReducer = combineReducers({
    user: UserReducer,
    intervals: IntervalsReducer,
    counterDetails: CounterDetailsReducer
});

export default rootReducer;
