import React, {Component} from 'react';
import HeaderLink from './HeaderLink';
import '../scss/components/NavBar.scss';

export default class NavBar extends Component {
    render() {
        return (
            <div
                className={'NavBar-wrapper center'}
                style={{
                    position: this.props.isSticky ? 'fixed' : 'relative'
                }}
            >
                <div className={'NavBar-body spaceBetween'}>
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={'/'}
                        text={'HOME'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={'/our-story'}
                        text={'OUR STORY'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={'/wedding-party'}
                        text={'WEDDING PARTY'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={'/pictures'}
                        text={'PICTURES'}
                    />
                    <HeaderLink
                        selected={this.props.location.pathname}
                        route={'/registry'}
                        text={'REGISTRY'}
                    />
                </div>
            </div>
        );
    }
}