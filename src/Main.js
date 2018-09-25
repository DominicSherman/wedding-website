import React, {Component} from 'react';

import headerImage from './assets/header.jpg';
import './css/HeaderImage.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';
import {withRouter} from 'react-router-dom';
import {initializeFirebase} from './services/firebase-service';
import RSVPInformation from './screens/RSVPInformation';
import {withRedux} from './redux-factory';

let headerImageRef;

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            presses: 0
        };
    }

    componentWillMount() {
        initializeFirebase();
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImageRef.clientHeight}));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            window.scrollTo({
                top: headerImageRef.clientHeight,
                behavior: 'smooth'
            });
            this.resetPresses();
        }
    }

    incrementPresses = () => this.setState({presses: this.state.presses + 1});

    resetPresses = () => this.setState({presses: 0});

    render() {
        return (
            <div>
                <div
                    id={'headerImageWrapper'}
                    className={'HeaderImage-wrapper'}
                    onClick={this.incrementPresses}
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
                <RSVPInformation
                    presses={this.state.presses}
                    resetPresses={this.resetPresses}
                />
            </div>
        );
    }
}

export default withRedux(withRouter(Main));