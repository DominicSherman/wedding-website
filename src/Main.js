import React, {Component} from 'react';

import headerImage from './assets/header.jpg';
import './css/HeaderImage.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';
import {withRouter} from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import {initializeFirebase} from './services/firebase-service';

let headerImageRef;

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            isLoading: true
        };
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImageRef.clientHeight}));

        initializeFirebase();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            window.scrollTo({
                top: headerImageRef.clientHeight,
                behavior: 'smooth'
            });
        }
    }

    render() {
        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor={'lightgrey'}
            >
                <div>
                    <div
                        id={'headerImageWrapper'}
                        className={'HeaderImage-wrapper'}
                    >
                        <img
                            alt=''
                            className={'HeaderImage-image'}
                            onLoad={() => this.setState({isLoading: false})}
                            src={headerImage}
                        />
                    </div>
                    <NavBar isSticky={this.state.isSticky}/>
                    <Routing isSticky={this.state.isSticky}/>
                    <Footer/>
                </div>
            </LoadingScreen>
        );
    }
}

export default withRouter(Main);