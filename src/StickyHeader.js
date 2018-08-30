import React, {Component} from 'react';
import {Row} from "simple-flexbox";
import flowers from './assets/flowers.png';

export default class StickyHeader extends Component {
    render() {
        return (
            <header className={"App-nav"}>
                <div className={"App-white"}/>
                <Row horizontal={'space-between'} className={"App-navColor"}>
                    <p>Home</p>
                    <p>Pictures</p>
                    <p>The Bridal Party</p>
                    <p>Her Story</p>
                    <p>His Story</p>
                    <p>The Best Man's Story</p>
                </Row>
                <img src={flowers} alt=''/>
            </header>
        );
    }
}