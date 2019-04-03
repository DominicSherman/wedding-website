import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'react-table/react-table.css';
import MainContainer from './containers/MainContainer';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

const Main = withRouter(MainContainer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Main/>
        </Router>
    </Provider>,
    document.getElementById('root'));
