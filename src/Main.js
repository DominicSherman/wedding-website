import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import headerImage from './assets/header.jpg';
import Home from './screens/Home';
import './css/Main.css';
import BridalParty from './screens/BridalParty';
import Pictures from './screens/Pictures';
import HerStory from './screens/HerStory';
import HisStory from './screens/HisStory';
import BestManStory from './screens/BestManStory';
import NavBar from './components/NavBar';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            isLoading: true
        };
    }

    componentDidMount() {
        const headerImage = document.getElementById('headerImage');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImage.clientHeight}));
    }

    render() {
        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor={'lightgrey'}
            >
                <Router>
                    <div>
                        <img
                            alt=''
                            className={'Main-headerImage'}
                            id={'headerImage'}
                            onLoad={() => this.setState({isLoading: false})}
                            src={headerImage}
                        />
                        <div
                            className={'Main-navBar'}
                            style={{position: this.state.isSticky ? 'fixed' : 'relative'}}
                        >
                            <NavBar/>
                        </div>

                        <Route exact path='/' component={
                            () => <Home isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/pictures' component={
                            () => <Pictures isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/bridal-party' component={
                            () => <BridalParty isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/her-story' component={
                            () => <HerStory isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/his-story' component={
                            () => <HisStory isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/best-man-story' component={
                            () => <BestManStory isSticky={this.state.isSticky}/>
                        }/>
                        <div className={'Main-footer'}>
                            <p>{'Website built by Dominic Sherman | Designed by Michael Sherman'}</p>
                        </div>
                    </div>
                </Router>
            </LoadingScreen>
        );
    }
}