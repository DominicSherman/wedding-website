import React, {Component} from 'react';
import HeaderLink from './HeaderLink';
import '../css/components/NavBar.css';
import {HOME, OUR_STORY, PICTURES, REGISTRY, WEDDING_PARTY} from '../constants/routes';

export default class NavBar extends Component {
    _getStyle = () => this.props.isSticky ? {
        backgroundColor: '#ebebeb',
        opacity: 1
    } : {};

    render() {
        return (
            <div
                className={'NavBar-wrapper center'}
                style={this._getStyle()}
            >
                <div className={'NavBar-body spaceBetween'}>
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={HOME}
                        text={'HOME'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={OUR_STORY}
                        text={'OUR STORY'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={WEDDING_PARTY}
                        text={'WEDDING PARTY'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={PICTURES}
                        text={'PICTURES'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={REGISTRY}
                        text={'REGISTRY'}
                    />
                </div>
            </div>
        );
    }
}