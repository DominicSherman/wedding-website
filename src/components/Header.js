import React, {Component} from 'react';
import {Row} from "simple-flexbox";
import '../css/Header.css';

export default class Header extends Component {
    render() {
        const {isSticky} = this.props;
        console.log('isSticky', isSticky);

        return (
            <div>
                <header className={'navBarContainer'} style={{
                    position: isSticky ? 'fixed' : 'relative',
                    top: 0
                }}>
                    <Row
                        className={'navBar'}
                        horizontal={'space-between'}
                    >
                        <p className={'headerText'}>Home</p>
                        <p className={'headerText'}>Pictures</p>
                        <p className={'headerText'}>The Bridal Party</p>
                        <p className={'headerText'}>Her Story</p>
                        <p className={'headerText'}>His Story</p>
                        <p className={'headerText'}>The Best Man's Story</p>
                    </Row>
                </header>
            </div>
        );
    }
}