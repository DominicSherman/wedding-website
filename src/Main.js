import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import headerImage from './assets/header.jpg';
import Home from './screens/Home';
import './css/Main.css';
import WeddingParty from './screens/WeddingParty';
import Pictures from './screens/Pictures';
import TheCouple from './screens/TheCouple';
import HeaderLink from './components/HeaderLink';

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
                            className={'Main-navBarWrapper'}
                            style={{position: this.state.isSticky ? 'fixed' : 'relative'}}
                        >
                            <div className={'Main-navBar'}>
                                <HeaderLink
                                    route={'/'}
                                    text={'HOME'}
                                />
                                <HeaderLink
                                    route={'/couple'}
                                    text={'THE COUPLE'}
                                />
                                <HeaderLink
                                    route={'/wedding-party'}
                                    text={'WEDDING PARTY'}
                                />
                                <HeaderLink
                                    route={'/pictures'}
                                    text={'PICTURES'}
                                />
                                <HeaderLink
                                    route={'/registry'}
                                    text={'REGISTRY'}
                                />
                            </div>
                        </div>

                        <Route exact path='/' component={
                            () => <Home isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/couple' component={
                            () => <TheCouple isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/wedding-party' component={
                            () => <WeddingParty isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/pictures' component={
                            () => <Pictures isSticky={this.state.isSticky}/>
                        }/>
                        <Route exact path='/registry' component={
                            () => <Registry isSticky={this.state.isSticky}/>
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