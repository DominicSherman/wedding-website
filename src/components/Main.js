import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Row} from "simple-flexbox";

import headerImage from '../assets/header.png';
import Home from "./Home";
import '../css/Main.css';
import BridalParty from "./BridalParty";
import Pictures from "./Pictures";
import HerStory from "./HerStory";
import HisStory from "./HisStory";
import BestManStory from "./BestManStory";

export default class Main extends Component {
    state = {
        isSticky: false
    };

    componentDidMount() {
        const headerImage = document.getElementById('headerImage');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImage.clientHeight}));
    }

    render() {
        return (
            <Router>
                <div>
                    <img
                        alt=''
                        className={'headerImage'}
                        id={'headerImage'}
                        src={headerImage}
                    />
                    <div>
                        <header className={'navBarContainer'} style={{
                            position: this.state.isSticky ? 'fixed' : 'relative',
                            top: 0
                        }}>
                            <Row
                                className={'navBar'}
                                horizontal={'space-between'}
                            >
                                <Link
                                    className={'link'}
                                    to='/'
                                >
                                    <p className={'headerText'}>
                                        {'Home'}
                                    </p>
                                </Link>
                                <Link
                                    className={'link'}
                                    to='/pictures'
                                >
                                    <p className={'headerText'}>Pictures</p>
                                </Link>
                                <Link
                                    className={'link'}
                                    to='/bridal-party'
                                >
                                    <p className={'headerText'}>The Bridal Party</p>
                                </Link>
                                <Link
                                    className={'link'}
                                    to='/her-story'
                                >
                                    <p className={'headerText'}>Her Story</p>
                                </Link>
                                <Link
                                    className={'link'}
                                    to='/his-story'
                                >
                                    <p className={'headerText'}>His Story</p>
                                </Link>
                                <Link
                                    className={'link'}
                                    to='/best-man-story'
                                >
                                    <p className={'headerText'}>The Best Man's Story</p>
                                </Link>
                            </Row>
                        </header>
                    </div>

                    <Route exact path="/" component={
                        () => <Home isSticky={this.state.isSticky}/>
                    }/>
                    <Route exact path="/pictures" component={
                        () => <Pictures isSticky={this.state.isSticky}/>
                    }/>
                    <Route exact path="/bridal-party" component={
                        () => <BridalParty isSticky={this.state.isSticky}/>
                    }/>
                    <Route exact path="/her-story" component={
                        () => <HerStory isSticky={this.state.isSticky}/>
                    }/>
                    <Route exact path="/his-story" component={
                        () => <HisStory isSticky={this.state.isSticky}/>
                    }/>
                    <Route exact path="/best-man-story" component={
                        () => <BestManStory isSticky={this.state.isSticky}/>
                    }/>
                </div>
            </Router>
        );
    }
}