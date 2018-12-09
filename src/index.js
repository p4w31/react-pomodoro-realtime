import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import App from './pages/App/App';
//import reducers from './reducers';
import rootReducer from './state/rootReducer';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

//const createStoreWithMiddleware = applyMiddleware()(createStore);
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )}>
        <App />
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
