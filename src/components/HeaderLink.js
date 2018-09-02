import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../css/HeaderLink.css';

export default class HeaderLink extends Component{
    render() {
        const {route, text} = this.props;

        return (
            <Link
                className={'HeaderLink-link'}
                to={`${route}`}
            >
                <p className={'HeaderLink-headerText'}>
                    {`${text}`}
                </p>
            </Link>
        );
    }
}