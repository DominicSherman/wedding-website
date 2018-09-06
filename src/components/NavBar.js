import React, {Component} from 'react';
import HeaderLink from './HeaderLink';
import '../css/NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div className={'Nav-container'}>
                <div className={'Nav-navigation'}>
                    <HeaderLink
                        route={'/'}
                        text={'HOME'}
                    />
                    <HeaderLink
                        route={'/pictures'}
                        text={'PICTURES'}
                    />
                    <HeaderLink
                        route={'/bridal-party'}
                        text={'BRIDAL PARTY'}
                    />
                    <HeaderLink
                        route={'/her-story'}
                        text={'HER STORY'}
                    />
                    <HeaderLink
                        route={'/his-story'}
                        text={'HIS STORY'}
                    />
                    <HeaderLink
                        route={'/best-man-story'}
                        text={'BEST MAN\'S STORY'}
                    />
                </div>
            </div>
        );
    }
}