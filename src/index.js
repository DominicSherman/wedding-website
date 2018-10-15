import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Main />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
