import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../css/HeaderLink.css';

export default class HeaderLink extends Component{
    render() {
        const {route, text} = this.props;

        return (
            <Link
                className={'link'}
                to={`${route}`}
            >
                <p className={'headerText'}>
                    {`${text}`}
                </p>
            </Link>
        );
    }
}