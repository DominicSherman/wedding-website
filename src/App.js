import React, {Component} from 'react';
import image from './assets/image.jpg';
import flowers from './assets/flowers.png';
import './App.css';
import {Column, Row} from 'simple-flexbox';

export default class App extends Component {
    render() {

        return (
            <div className={"App"}>
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
                <Column className={"App-header"} vertical={'center'}>
                    <header className={"App-title"}>Dominic</header>
                    <header className={"App-title"}>+</header>
                    <header className={"App-title"}>Mary</header>
                </Column>
                <p className={"App-image"}>
                    <img src={image} alt=''/>
                </p>
            </div>
        );
    }
}
