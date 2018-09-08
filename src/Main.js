import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import headerImage from './assets/header.jpg';
import logo from './assets/D&M-logo.png';
import oregonMark from './assets/Oregon-mark.png';
import ringMark from './assets/Ring-mark.png';
import WeddingParty from './screens/WeddingParty';
import Pictures from './screens/Pictures';
import TheCouple from './screens/TheCouple';
import HeaderLink from './components/HeaderLink';
import Registry from './screens/Registry';
import Home from './screens/Home';
import './css/Main.css';
import './css/Flex.css';

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
                            className={'Main-navBarWrapper center'}
                            style={{
                                position: this.state.isSticky ? 'fixed' : 'relative'
                            }}
                        >
                            <div className={'Main-navBar spaceBetween'}>
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

                        <div style={{
                            marginTop: this.state.isSticky ? '9.6%' : '0'
                        }}>
                            <Route exact path='/' component={
                                () => <Home/>
                            }/>
                            <Route exact path='/couple' component={
                                () => <TheCouple/>
                            }/>
                            <Route exact path='/wedding-party' component={
                                () => <WeddingParty/>
                            }/>
                            <Route exact path='/pictures' component={
                                () => <Pictures/>
                            }/>
                            <Route exact path='/registry' component={
                                () => <Registry/>
                            }/>
                        </div>

                        <div className={'Main-footer column'}>
                            <div className={'Main-logoWrapper center'}>
                                <img
                                    alt={''}
                                    className={'Main-images'}
                                    src={logo}
                                />
                            </div>
                            <div className={'Main-marksWrapper spaceEvenly'}>
                                <img
                                    alt={''}
                                    className={'Main-images'}
                                    src={ringMark}
                                />
                                <img
                                    alt={''}
                                    className={'Main-images'}
                                    src={oregonMark}
                                />
                            </div>
                            <p className={'Main-text center'}>{'Website built by Dominic Sherman | Designed by Michael Sherman'}</p>
                        </div>
                    </div>
                </Router>
            </LoadingScreen>
        );
    }
}