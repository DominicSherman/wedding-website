import React, {Component} from 'react';
import './css/Main.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';
import {initializeFirebase} from './services/firebase-service';
import ModalContainer from './modals/ModalContainer';
import LoadingScreen from 'react-loading-screen';
import {initializeAnalytics} from './services/analytics-service';
import {calculateDaysLeft} from './constants/service';
import {headerImages} from './constants/header-images';

let headerImageRef;

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            presses: 0,
            loading: true
        };
    }

    incrementPresses = () => this.setState({presses: this.state.presses + 1});

    resetPresses = () => this.setState({presses: 0});

    setIsSticky = (isSticky) => this.setState({isSticky});

    setLoading = (loading) => this.setState({loading});

    componentWillMount() {
        initializeFirebase();
        initializeAnalytics();
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => {
            if (window.scrollY > headerImageRef.clientHeight && !this.state.isSticky) {
                this.setIsSticky(true);
            } else if (window.scrollY < headerImageRef.clientHeight && this.state.isSticky) {
                this.setIsSticky(false);
            }
        });

        this.props.actions.setRSVPData();
        this.props.actions.setMedia();

        if (calculateDaysLeft() <= 0) {
            this.props.actions.togglePicturesVisible();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.presses > 0) {
            setTimeout(this.resetPresses, 5000);
        }

        if (this.state.presses === 10) {
            this.props.actions.toggleAdminMenu();
            this.resetPresses();
        }

        if (prevProps.config.env !== this.props.config.env) {
            this.props.actions.setRSVPData();
            this.props.actions.setMedia();
        }
    }

    render() {
        return (
            <LoadingScreen
                loading={this.state.loading}
                bgColor={'#ebebeb'}
            >
                <div>
                    <div
                        id={'headerImageWrapper'}
                        className={'Main-wrapper'}
                        onClick={this.incrementPresses}
                    >
                        <img
                            alt=''
                            className={'Main-image'}
                            src={headerImages[this.props.location.pathname]}
                            onLoad={() => this.setLoading(false)}
                        />
                    </div>
                    <NavBar isSticky={this.state.isSticky} location={this.props.location}/>
                    <Routing />
                    <Footer/>
                    <ModalContainer {...this.props}/>
                </div>
            </LoadingScreen>
        );
    }
}