import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../state/rootReducer';

export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

    return createStoreWithMiddleware(rootReducer, initialState);
}

export const findByTestAttr = (wrapped, val) => {
    return wrapped.find(`[data-test="${val}"]`);
}

export const checkProps = (component, propsToCheck) => {
    const propsError = checkPropTypes(component.propTypes, propsToCheck, 'prop', component.name);
    expect(propsError).toBeUndefined();
}