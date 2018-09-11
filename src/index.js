import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Main/>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
