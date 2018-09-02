import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Row} from "simple-flexbox";

import headerImage from './assets/images/header.png';
import Home from "./screens/Home";
import './css/Main.css';
import BridalParty from "./screens/BridalParty";
import Pictures from "./screens/Pictures";
import HerStory from "./screens/HerStory";
import HisStory from "./screens/HisStory";
import BestManStory from "./screens/BestManStory";
import HeaderLink from "./components/HeaderLink";

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
                    <div className={'navBarContainer'} style={{
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