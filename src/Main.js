import React, {Component} from 'react';
import headerImage from './assets/header.jpg';
import './css/Main.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';
import {withRouter} from 'react-router-dom';
import {initializeFirebase} from './services/firebase-service';
import ModalContainer from './modals/ModalContainer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoadingScreen from 'react-loading-screen';

import * as ActionCreators from './actions';

let headerImageRef;

export class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            presses: 0,
            loading: true
        };
    }

    componentWillMount() {
        initializeFirebase();
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => {
            if (window.scrollY > headerImageRef.clientHeight && !this.state.isSticky) {
                this.setState({isSticky: true});
            } else if (window.scrollY < headerImageRef.clientHeight && this.state.isSticky) {
                this.setState({isSticky: false});
            }

        });

        this.props.actions.setRSVPData();
        this.props.actions.setMedia();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            window.scrollTo({
                top: headerImageRef.clientHeight,
                behavior: 'smooth'
            });
        }

        if (this.state.presses > 0) {
            setTimeout(
                () => this.setState({presses: 0}),
                5000
            );
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

    incrementPresses = () => this.setState({presses: this.state.presses + 1});

    resetPresses = () => this.setState({presses: 0});

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
                            src={headerImage}
                            onLoad={() => this.setState({loading: false})}
                        />
                    </div>
                    <NavBar isSticky={this.state.isSticky} location={this.props.location}/>
                    <Routing isSticky={this.state.isSticky}/>
                    <Footer/>
                    <ModalContainer {...this.props}/>
                </div>
            </LoadingScreen>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));