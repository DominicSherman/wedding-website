import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './screens/Home';
import OurStory from './screens/OurStory';
import WeddingParty from './screens/WeddingParty';
import Pictures from './screens/Pictures';
import Registry from './screens/Registry';

export default class Routing extends Component {
    render() {
        return (
            <div style={{
                marginTop: this.props.isSticky ? '7.68%' : '0'
            }}>
                <Route exact path='/' render={
                    ({location}) => <Home location={location}/>
                }/>
                <Route exact path='/our-story' render={
                    ({location}) => <OurStory location={location}/>
                }/>
                <Route exact path='/wedding-party' render={
                    ({location}) => <WeddingParty location={location}/>
                }/>
                <Route exact path='/pictures' render={
                    ({location}) => <Pictures location={location}/>
                }/>
                <Route exact path='/registry' render={
                    ({location}) => <Registry location={location}/>
                }/>
            </div>
        );
    }
}