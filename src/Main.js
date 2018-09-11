import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import headerImage from './assets/header.jpg';
import './css/HeaderImage.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false
        };
    }

    componentDidMount() {
        const headerImageWrapper = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImageWrapper.clientHeight}));
    }

    render() {
        return (
            <Router>
                <div>
                    <div
                        id={'headerImageWrapper'}
                        className={'HeaderImage-wrapper'}
                    >
                        <img
                            alt=''
                            className={'HeaderImage-image'}
                            src={headerImage}
                        />
                    </div>
                    <NavBar isSticky={this.state.isSticky}/>
                    <Routing isSticky={this.state.isSticky}/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}