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
import HeaderLink from "./HeaderLink";

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
                                <HeaderLink
                                    route={'/'}
                                    text={'Home'}
                                />
                                <HeaderLink
                                    route={'/pictures'}
                                    text={'Pictures'}
                                />
                                <HeaderLink
                                    route={'/bridal-party'}
                                    text={'Bridal Party'}
                                />
                                <HeaderLink
                                    route={'/her-story'}
                                    text={'Her Story'}
                                />
                                <HeaderLink
                                    route={'/his-story'}
                                    text={'His Story'}
                                />
                                <HeaderLink
                                    route={'/best-man-story'}
                                    text={'Best Man\'s Story'}
                                />
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