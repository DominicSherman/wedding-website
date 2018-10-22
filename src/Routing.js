import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './screens/Home';
import OurStory from './screens/OurStory';
import WeddingParty from './screens/WeddingParty';
import Registry from './screens/Registry';
import PicturesContainer from './containers/PicturesContainer';

export default class Routing extends Component {
    render() {
        return (
            <div style={{
                marginTop: this.props.isSticky ? '7.68%' : '0'
            }}>
                <Route
                    exact
                    path='/'
                    render={({location}) =>
                        <Home location={location}/>
                    }
                />
                <Route
                    exact
                    path='/our-story'
                    render={({location}) =>
                        <OurStory location={location}/>
                    }
                />
                <Route
                    exact
                    path='/wedding-party'
                    render={({location}) =>
                        <WeddingParty location={location}/>
                    }
                />
                <Route
                    exact
                    path='/pictures'
                    render={({location}) =>
                        <PicturesContainer location={location}/>
                    }
                />
                <Route
                    exact
                    path='/registry'
                    render={({location}) =>
                        <Registry location={location}/>
                    }
                />
            </div>
        );
    }
}