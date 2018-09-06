import React, {Component} from 'react';
import HeaderLink from './HeaderLink';
import '../css/NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div className={'container'}>
                <div className={'navigation'}>
                    <HeaderLink
                        route={'/'}
                        text={'Home'}
                    />
                    <HeaderLink
                        route={'/pictures'}
                        text={'Pictures'}
                    />
                    <HeaderLink
                        route={'/bridal-party'}
                        text={'Bridal Party'}
                    />
                    <HeaderLink
                        route={'/her-story'}
                        text={'Her Story'}
                    />
                    <HeaderLink
                        route={'/his-story'}
                        text={'His Story'}
                    />
                    <HeaderLink
                        route={'/best-man-story'}
                        text={'Best Man\'s Story'}
                    />
                </div>
            </div>
        );
    }
}