import React, {Component} from 'react';
import image from './image.jpg';
import './App.css';
import {Column, Row} from 'simple-flexbox';

export default class App extends Component {
    render() {

        return (
            <div className="App">
                <Row horizontal={'space-between'}>
                    <p>Home</p>
                    <p>Pictures</p>
                    <p>The Bridal Party</p>
                    <p>Her Story</p>
                    <p>His Story</p>
                    <p>The Best Man's Story</p>
                </Row>
                <Column className="App-header" vertical={'center'}>
                    <h1 className="App-title">Dominic + Mary</h1>
                </Column>
                <p className="App-intro">
                    <img src={image}/>
                </p>
            </div>
        );
    }
}
