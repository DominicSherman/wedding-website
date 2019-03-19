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
            loading: true,
            loadedImages: []
        };
    }

    incrementPresses = () => this.setState({presses: this.state.presses + 1});

    resetPresses = () => this.setState({presses: 0});

    setIsSticky = (isSticky) => this.setState({isSticky});

    setLoading = (loading) => this.setState({loading});

    addRouteToLoadedImages = (route) => this.setState({loadedImages: [...this.state.loadedImages, route]});

    componentWillMount() {
        initializeFirebase();
        initializeAnalytics();
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => {
            if (window.scrollY > headerImageRef.clientHeight - 85 && !this.state.idsSticky) {
                this.setIsSticky(true);
            } else if (window.scrollY < headerImageRef.clientHeight - 85 && this.state.isSticky) {
                this.setIsSticky(false);
            }
        });

        this.props.actions.setRSVPData();
        this.props.actions.setMedia();

        if (calculateDaysLeft() <= 0) {
            this.props.actions.togglePicturesVisible();
        }

        this.addRouteToLoadedImages(this.props.location.pathname);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            if (!this.state.loadedImages.includes(this.props.location.pathname)) {
                console.log('this.state.loadedImages', this.state.loadedImages);
                console.log('this.props.location', this.props.location);
                this.setLoading(true);
                this.addRouteToLoadedImages(this.props.location.pathname);
            }
        }

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
                bgColor='#f1f1f1'
                spinnerColor='#5F5D62'
                logoSrc="https://firebasestorage.googleapis.com/v0/b/wedding-website-46644.appspot.com/o/D%26M-logo.png?alt=media&token=a6b6d521-fe5f-4ff3-976a-158d245b88fa"
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
                            onLoad={() => {
                                this.setLoading(false);
                                this.setIsSticky(false);
                            }}
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