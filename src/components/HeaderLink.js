import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import '../css/components/HeaderLink.css';

export default class HeaderLink extends Component{
    render() {
        const {route, text} = this.props;

        return (
            <NavLink
                className={'HeaderLink-link'}
                to={`${route}`}
            >
                <p className={'HeaderLink-headerText'}>
                    {`${text}`}
                </p>
            </NavLink>
        );
    }
}