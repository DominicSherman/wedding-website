import React, {Component} from 'react';
import {Row} from "simple-flexbox";
import flowers from '../assets/flowers.png';
import beach from '../assets/beach.jpg';
import '../css/StickyHeader.css';

export default class StickyHeader extends Component {
    render() {
        return (
            <div>
                <img src={beach} alt=''/>
                <span className={'title'}>Dominic + Mary</span>
                <header className={"StickyHeader-nav"}>
                    <Row horizontal={'space-between'} className={"StickyHeader-color"}>
                        <p>Home</p>
                        <p>Pictures</p>
                        <p>The Bridal Party</p>
                        <p>Her Story</p>
                        <p>His Story</p>
                        <p>The Best Man's Story</p>
                    </Row>
                    <img src={flowers} alt=''/>
                </header>
            </div>
        );
    }
}