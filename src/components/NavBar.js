import React, {Component} from 'react';
import HeaderLink from './HeaderLink';
import '../css/components/NavBar.css';

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
                        route={'/'}
                        text={'HOME'}
                    />
                    <HeaderLink
                        route={'/our-story'}
                        text={'OUR STORY'}
                    />
                    <HeaderLink
                        route={'/wedding-party'}
                        text={'WEDDING PARTY'}
                    />
                    <HeaderLink
                        route={'/pictures'}
                        text={'PICTURES'}
                    />
                    <HeaderLink
                        route={'/registry'}
                        text={'REGISTRY'}
                    />
                </div>
            </div>
        );
    }
}